import json
import logging
import os
import urllib.request
import urllib.error
from dataclasses import dataclass, asdict
from typing import Dict, List, Any, Optional

# Configuração do Logger moderno e estruturado
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger("IngestorGameCerto")

# Chaves e Hosts obtidos por variáveis de ambiente ou com fallback seguro
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY", "cf1135635bmsh474fe305c0cc252p18816fjsne45f0c9774ab")
RAPIDAPI_HOST = "free-to-play-games-database.p.rapidapi.com"

@dataclass
class Game:
    title: str
    genre: str
    tags: List[str]
    platform: str
    thumbnail: str
    short_description: str
    developer: str
    release_date: str
    game_url: str
    min_ram: int
    price: str
    worth: str
    sale_price: Optional[str] = None

# Base de dados local robusta (jogos gratuitos padrão + jogos pagos premium adicionados)
FALLBACK_GAMES: List[Game] = [
    Game(
        title="League of Legends",
        genre="MOBA",
        tags=["moba", "strategy", "pvp", "3d"],
        platform="PC (Windows)",
        thumbnail="https://www.freetogame.com/g/286/thumbnail.jpg",
        short_description="Um MOBA lendário focado em equipes e estratégia, desenvolvido pela Riot Games.",
        developer="Riot Games",
        release_date="2009-10-27",
        game_url="https://www.leagueoflegends.com",
        min_ram=8,
        price="free",
        worth="N/A"
    ),
    Game(
        title="Valorant",
        genre="Shooter",
        tags=["shooter", "first-person", "pvp", "3d", "action"],
        platform="PC (Windows)",
        thumbnail="https://www.freetogame.com/g/433/thumbnail.jpg",
        short_description="Um shooter tático de 5v5 focado em personagens e precisão de tiro.",
        developer="Riot Games",
        release_date="2020-06-02",
        game_url="https://playvalorant.com",
        min_ram=8,
        price="free",
        worth="N/A"
    ),
    Game(
        title="Minecraft",
        genre="Sandbox",
        tags=["sandbox", "survival", "3d"],
        platform="PC (Windows), PlayStation, Xbox, Switch",
        thumbnail="https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=600&auto=format&fit=crop",
        short_description="Explore mundos infinitos e construa de tudo, desde a mais simples das casas até o mais grandioso dos castelos.",
        developer="Mojang Studios",
        release_date="2011-11-18",
        game_url="https://www.minecraft.net",
        min_ram=4,
        price="paid",
        worth="$29.99"
    ),
    Game(
        title="Elden Ring",
        genre="Action RPG",
        tags=["action-rpg", "open-world", "fantasy", "3d", "action"],
        platform="PC (Windows), PlayStation, Xbox",
        thumbnail="https://images.unsplash.com/photo-1655821888788-6107699e173b?q=80&w=600&auto=format&fit=crop",
        short_description="Um RPG de ação de fantasia sombria em um vasto mundo aberto criado por Hidetaka Miyazaki e George R. R. Martin.",
        developer="FromSoftware",
        release_date="2022-02-25",
        game_url="https://www.eldenring.com",
        min_ram=12,
        price="paid",
        worth="$59.99"
    ),
    Game(
        title="Cyberpunk 2077",
        genre="RPG",
        tags=["sci-fi", "open-world", "action", "first-person", "3d"],
        platform="PC (Windows), PlayStation, Xbox",
        thumbnail="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=600&auto=format&fit=crop",
        short_description="RPG de ação e aventura em mundo aberto ambientado em Night City, uma megalópole obcecada por poder e modificações corporais.",
        developer="CD Projekt Red",
        release_date="2020-12-10",
        game_url="https://www.cyberpunk.net",
        min_ram=12,
        price="paid",
        worth="$59.99"
    ),
    Game(
        title="Grand Theft Auto V",
        genre="Action",
        tags=["open-world", "action", "3d", "pvp"],
        platform="PC (Windows), PlayStation, Xbox",
        thumbnail="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
        short_description="Um ladrão de rua, um ladrão de bancos aposentado e um psicopata aterrorizante se envolvem com o submundo do crime.",
        developer="Rockstar North",
        release_date="2013-09-17",
        game_url="https://www.rockstargames.com/gta-v",
        min_ram=8,
        price="paid",
        worth="$29.99"
    ),
    Game(
        title="Red Dead Redemption 2",
        genre="Action",
        tags=["open-world", "action", "survival", "3d"],
        platform="PC (Windows), PlayStation, Xbox",
        thumbnail="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
        short_description="Uma história épica sobre a vida e a sobrevivência no implacável coração dos Estados Unidos no fim do século XIX.",
        developer="Rockstar Games",
        release_date="2018-10-26",
        game_url="https://www.rockstargames.com/reddeadredemption2",
        min_ram=12,
        price="paid",
        worth="$59.99"
    )
]

class GamesIngestor:
    """Classe responsável por buscar, estruturar e salvar dados de jogos de múltiplas APIs."""

    def __init__(self) -> None:
        self.games_map: Dict[str, Game] = {}

    def load_fallback_games(self) -> None:
        """Carrega os jogos de fallback locais para garantir consistência básica."""
        logger.info("Carregando banco de dados local básico como ponto de partida...")
        for game in FALLBACK_GAMES:
            self.games_map[game.title.lower()] = game

    def _estimate_ram(self, short_description: str, genre: str) -> int:
        """Estima o requisito mínimo de RAM baseado no gênero e descrição (heurística)."""
        desc_lower = short_description.lower()
        genre_lower = genre.lower()
        
        is_heavy = (
            "graficos incriveis" in desc_lower or
            "unreal engine" in desc_lower or
            "next-gen" in desc_lower or
            "open-world" in desc_lower or
            "mundo aberto" in desc_lower or
            "shooter" in genre_lower or
            "battle royale" in genre_lower or
            "action rpg" in genre_lower or
            "rpg" in genre_lower
        )
        return 12 if is_heavy else 8

    def fetch_freetogame(self) -> None:
        """Busca jogos gratuitos para PC e Navegador na FreeToGame API."""
        logger.info("Buscando jogos grátis da FreeToGame API...")
        url = "https://free-to-play-games-database.p.rapidapi.com/api/games"
        
        req = urllib.request.Request(
            url,
            headers={
                "X-RapidAPI-Key": RAPIDAPI_KEY,
                "X-RapidAPI-Host": RAPIDAPI_HOST
            }
        )

        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                if response.status == 200:
                    data = json.loads(response.read().decode("utf-8"))
                    games_list = data if isinstance(data, list) else list(data.values())
                    
                    for item in games_list:
                        title_key = item.get("title", "").strip().lower()
                        if not title_key:
                            continue

                        # Normaliza plataformas
                        plat_lower = item.get("platform", "").lower()
                        platform_label = "PC (Windows)"
                        if "browser" in plat_lower or "web" in plat_lower:
                          platform_label = "Navegador (Web)"

                        genre = item.get("genre", "Gamer")
                        short_desc = item.get("short_description", "Um jogo gratuito fantástico!")
                        
                        game = Game(
                            title=item.get("title"),
                            genre=genre,
                            tags=[genre.lower()] if genre else [],
                            platform=platform_label,
                            thumbnail=item.get("thumbnail", ""),
                            short_description=short_desc,
                            developer=item.get("developer", "Não Informado"),
                            release_date=item.get("release_date", "N/A"),
                            game_url=item.get("game_url") or item.get("freetogame_profile_url") or "https://www.freetogame.com",
                            min_ram=self._estimate_ram(short_desc, genre),
                            price="free",
                            worth="N/A"
                        )
                        
                        self.games_map[title_key] = game
                    logger.info(f"Sucesso! {len(games_list)} jogos carregados da FreeToGame.")
                else:
                    logger.warning(f"FreeToGame retornou status de resposta: {response.status}")
        except urllib.error.URLError as e:
            logger.error(f"Erro ao acessar FreeToGame API: {e.reason}")
        except Exception as e:
            logger.error(f"Erro inesperado na FreeToGame: {e}")

    def fetch_gamerpower(self) -> None:
        """Busca brindes e jogos pagos temporariamente gratuitos na GamerPower API."""
        logger.info("Buscando brindes ativos de consoles da GamerPower API...")
        url = "https://www.gamerpower.com/api/giveaways"

        try:
            with urllib.request.urlopen(url, timeout=15) as response:
                if response.status == 200:
                    data = json.loads(response.read().decode("utf-8"))
                    items_list = data if isinstance(data, list) else list(data.values())

                    for item in items_list:
                        # Processa apenas brindes ativos e que sejam JOGOS reais (ignora DLC/Loot de cosméticos)
                        if item.get("status") != "Active":
                            continue

                        item_type = item.get("type", "")
                        if item_type not in ["Game", "Early Access"]:
                            continue

                        title_key = item.get("title", "").strip().lower()
                        if not title_key:
                            continue

                        plat_lower = item.get("platforms", "").lower()
                        platforms: List[str] = []

                        # Identifica consoles suportados
                        if any(x in plat_lower for x in ["pc", "steam", "epic", "gog"]):
                            platforms.append("PC (Windows)")
                        if any(x in plat_lower for x in ["playstation", "ps4", "ps5"]):
                            platforms.append("PlayStation (PS4/PS5)")
                        if any(x in plat_lower for x in ["xbox", "series"]):
                            platforms.append("Xbox (One/Series)")
                        if any(x in plat_lower for x in ["switch", "nintendo"]):
                            platforms.append("Nintendo Switch")

                        if not platforms:
                            continue

                        worth = item.get("worth", "N/A")
                        is_paid = worth != "N/A" and worth != "$0.00"

                        # Se o jogo já existir (por exemplo, na FreeToGame), mantemos a versão anterior e mesclamos o preço/brinde
                        if title_key in self.games_map:
                            existing = self.games_map[title_key]
                            existing.price = "paid" if is_paid else existing.price
                            existing.worth = worth if worth != "N/A" else existing.worth
                            existing.game_url = item.get("open_giveaway_url") or existing.game_url
                        else:
                            game = Game(
                                title=item.get("title"),
                                genre=item.get("type", "Brinde/DLC"),
                                tags=[item.get("type", "").lower()] if item.get("type") else [],
                                platform=", ".join(platforms),
                                thumbnail=item.get("thumbnail") or item.get("image", ""),
                                short_description=item.get("description", "Resgate grátis por tempo limitado!"),
                                developer="GamerPower Giveaway",
                                release_date=item.get("published_date", "N/A").split(" ")[0],
                                game_url=item.get("open_giveaway_url") or "https://www.gamerpower.com",
                                min_ram=4,  # Requisito leve padrão para brindes/consoles
                                price="paid" if is_paid else "free",
                                worth=worth
                            )
                            self.games_map[title_key] = game
                    logger.info(f"Sucesso! {len(items_list)} brindes processados da GamerPower.")
                else:
                    logger.warning(f"GamerPower retornou status de resposta: {response.status}")
        except urllib.error.URLError as e:
            logger.error(f"Erro ao acessar GamerPower API: {e.reason}")
        except Exception as e:
            logger.error(f"Erro inesperado na GamerPower: {e}")

    def clean_title_for_igdb(self, title: str) -> str:
        """Limpa o título removendo marcas de plataforma e edições especiais para busca no IGDB."""
        import re
        # Remove parênteses, colchetes e tudo dentro
        t = re.sub(r'[\(\[][^\)\]]*[\)\]]', '', title)
        # Remove palavras-chave comuns de plataforma ou edições
        for word in ["PC", "Steam", "GOG", "Epic Games", "ROW", "Edition", "Cut", "Director's Cut", "Gold Edition", "Standard Edition", "Deluxe Edition"]:
            t = re.sub(rf'\b{word}\b', '', t, flags=re.IGNORECASE)
        # Limpa caracteres especiais no final ou início e substitui múltiplos espaços
        t = t.replace(":", "").replace("-", "").strip()
        t = re.sub(r'\s+', ' ', t)
        return t

    def fetch_twitch_token(self) -> str:
        """Adquire o access token da Twitch OAuth2 para autenticação no IGDB."""
        import urllib.parse
        client_id = os.getenv("IGBD_ID", "xv9jhbvj43cv1h2r7w01nczaslqqc8")
        client_secret = os.getenv("IGDB_SECRET", "tjawudm7uaq2bu4gyxacp8fwolz53f")
        
        url = "https://id.twitch.tv/oauth2/token"
        params = {
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": "client_credentials"
        }
        data = urllib.parse.urlencode(params).encode("utf-8")
        req = urllib.request.Request(url, data=data, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=10) as res:
                resp = json.loads(res.read().decode("utf-8"))
                token = resp.get("access_token")
                logger.info("Token Twitch/IGDB obtido com sucesso.")
                return token
        except Exception as e:
            logger.error(f"Erro ao obter token da Twitch: {e}")
            return ""

    def query_igdb(self, titles: list, token: str) -> dict:
        """Consulta metadados de múltiplos títulos no IGDB em uma única requisição em lote."""
        if not token:
            return {}
            
        client_id = os.getenv("IGBD_ID", "xv9jhbvj43cv1h2r7w01nczaslqqc8")
        url = "https://api.igdb.com/v4/games"
        headers = {
            "Client-ID": client_id,
            "Authorization": f"Bearer {token}",
            "Content-Type": "text/plain"
        }
        
        # Escapa aspas nas strings de títulos
        escaped_titles = [t.replace('"', '\\"') for t in titles]
        titles_tuple = ", ".join(f'"{t}"' for t in escaped_titles)
        body = f"where name = ({titles_tuple}); fields name, cover.url, summary, rating, genres.name, platforms.name, first_release_date, involved_companies.company.name, involved_companies.developer; limit {len(titles)};"
        
        req = urllib.request.Request(url, data=body.encode("utf-8"), headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=10) as res:
                resp = json.loads(res.read().decode("utf-8"))
                
                # Mapeia os dados retornados pelo nome (chave em minúsculas sem espaços)
                igdb_data = {}
                for item in resp:
                    name_key = item.get("name", "").strip().lower()
                    igdb_data[name_key] = item
                return igdb_data
        except Exception as e:
            logger.error(f"Erro ao consultar IGDB: {e}")
            return {}

    def search_igdb_game(self, title: str, token: str) -> Optional[dict]:
        """Faz uma busca difusa (fuzzy search) de um único título no IGDB e retorna o melhor resultado."""
        if not token:
            return None
            
        client_id = os.getenv("IGBD_ID", "xv9jhbvj43cv1h2r7w01nczaslqqc8")
        url = "https://api.igdb.com/v4/games"
        headers = {
            "Client-ID": client_id,
            "Authorization": f"Bearer {token}",
            "Content-Type": "text/plain"
        }
        
        escaped_title = title.replace('"', '\\"')
        body = f'search "{escaped_title}"; fields name, cover.url, summary, rating, genres.name, platforms.name, first_release_date, involved_companies.company.name, involved_companies.developer; limit 1;'
        
        req = urllib.request.Request(url, data=body.encode("utf-8"), headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=10) as res:
                resp = json.loads(res.read().decode("utf-8"))
                if resp and isinstance(resp, list) and len(resp) > 0:
                    return resp[0]
        except Exception as e:
            logger.debug(f"Erro ao buscar no IGDB para '{title}': {e}")
        return None

    def fetch_cheapshark(self) -> None:
        """Busca ofertas ativas de jogos de PC pagos na CheapShark API e cruza com a IGDB API para metadados ricos."""
        import time
        logger.info("Buscando ofertas de jogos PC na CheapShark API...")
        # Buscamos as top 150 ofertas ordenadas por desconto/economia
        url = "https://www.cheapshark.com/api/1.0/deals?pageSize=150"

        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Connection": "keep-alive"
                }
            )
            with urllib.request.urlopen(req, timeout=15) as response:
                if response.status == 200:
                    data = json.loads(response.read().decode("utf-8"))
                    deals_list = data if isinstance(data, list) else list(data.values())

                    logger.info(f"Carregadas {len(deals_list)} ofertas iniciais da CheapShark.")
                    
                    # 1. Obtém token Twitch/IGDB e busca dados em lote
                    twitch_token = self.fetch_twitch_token()
                    igdb_enrichment = {}
                    if twitch_token:
                        # Mapeamento do título limpo para a chave de busca original
                        clean_to_original = {}
                        clean_titles = []
                        for item in deals_list:
                            orig_title = item.get("title", "")
                            if orig_title:
                                clean_t = self.clean_title_for_igdb(orig_title)
                                if clean_t and clean_t not in clean_titles:
                                    clean_titles.append(clean_t)
                                clean_to_original[clean_t.lower()] = orig_title.strip().lower()
                        
                        batch_size = 20
                        logger.info(f"Enriquecendo {len(clean_titles)} títulos (limpos) com o IGDB em lotes de {batch_size}...")
                        unmatched_titles = []
                        for i in range(0, len(clean_titles), batch_size):
                            batch_titles = clean_titles[i:i+batch_size]
                            batch_data = self.query_igdb(batch_titles, twitch_token)
                            
                            # Mapeia de volta usando o clean_to_original
                            for clean_name_key, igdb_game in batch_data.items():
                                if clean_name_key in clean_to_original:
                                    orig_key = clean_to_original[clean_name_key]
                                    igdb_enrichment[orig_key] = igdb_game
                            time.sleep(0.25) # Respeita limite de taxa de 4 req/seg da Twitch
                            
                        # Determina quais títulos limpos não foram encontrados no lote exato
                        for clean_t in clean_titles:
                            orig_key = clean_to_original.get(clean_t.lower())
                            if orig_key not in igdb_enrichment:
                                unmatched_titles.append(clean_t)
                                
                        # 2. Busca difusa individual para os não encontrados
                        if unmatched_titles:
                            logger.info(f"Buscando {len(unmatched_titles)} títulos restantes via busca difusa no IGDB...")
                            for clean_t in unmatched_titles:
                                igdb_game = self.search_igdb_game(clean_t, twitch_token)
                                if igdb_game:
                                    orig_key = clean_to_original.get(clean_t.lower())
                                    if orig_key:
                                        igdb_enrichment[orig_key] = igdb_game
                                time.sleep(0.25) # Respeita o limite de 4 req/seg
                                
                        logger.info(f"Metadados de {len(igdb_enrichment)} jogos recuperados do IGDB no total.")

                    # 2. Processa cada oferta da CheapShark
                    for idx, item in enumerate(deals_list):
                        title = item.get("title", "")
                        title_key = title.strip().lower()
                        if not title_key:
                            continue

                        normal_price = f"${item.get('normalPrice')}"
                        sale_price = f"${item.get('salePrice')}"
                        deal_url = f"https://www.cheapshark.com/redirect?dealID={item.get('dealID')}"
                        
                        # Valores padrão de fallback
                        genre = "Oferta / Promoção"
                        tags = ["promo", "oferta", "deals"]
                        short_desc = "Uma oferta incrível de PC ativa no momento!"
                        developer = "Steam Store Deals"
                        release_date = "N/A"
                        min_ram = 8
                        thumbnail = item.get("thumb")

                        # Heurística de fallback para gêneros se o IGDB falhar/não tiver o jogo
                        title_lower = title_key.lower()
                        if any(w in title_lower for w in ["shoot", "duty", "doom", "battlefield", "crysis", "sniper", "halo", "wolfenstein", "counter"]):
                            genre = "Shooter"
                            tags = ["shooter", "action", "fps", "promo", "oferta"]
                        elif any(w in title_lower for w in ["rpg", "witcher", "scrolls", "fantasy", "diablo", "final fantasy", "souls", "elden"]):
                            genre = "RPG"
                            tags = ["rpg", "adventure", "fantasy", "promo", "oferta"]
                        elif any(w in title_lower for w in ["strategy", "age of", "civilization", "command", "tactics", "warhammer", "total war"]):
                            genre = "Strategy"
                            tags = ["strategy", "tactical", "promo", "oferta"]
                        elif any(w in title_lower for w in ["race", "racing", "speed", "dirt", "f1", "moto", "drive"]):
                            genre = "Racing"
                            tags = ["racing", "sports", "promo", "oferta"]
                        elif any(w in title_lower for w in ["survival", "rust", "ark", "zombie", "dead", "forest", "dayz"]):
                            genre = "Survival"
                            tags = ["survival", "action", "promo", "oferta"]

                        # Aplica metadados ricos do IGDB
                        if title_key in igdb_enrichment:
                            igdb_game = igdb_enrichment[title_key]
                            
                            cover_url = igdb_game.get("cover", {}).get("url")
                            if cover_url:
                                thumbnail = "https:" + cover_url.replace("t_thumb", "t_cover_big")
                                
                            if igdb_game.get("summary"):
                                short_desc = igdb_game.get("summary")
                                
                            igdb_genres = [g.get("name") for g in igdb_game.get("genres", [])]
                            if igdb_genres:
                                genre = igdb_genres[0]
                                tags = [g.lower() for g in igdb_genres if g] + ["promo", "oferta", "deals"]
                                
                            devs = []
                            for ic in igdb_game.get("involved_companies", []):
                                if ic.get("developer", False):
                                    comp = ic.get("company", {})
                                    if comp.get("name"):
                                        devs.append(comp.get("name"))
                            if devs:
                                developer = devs[0]
                                
                            first_release = igdb_game.get("first_release_date")
                            if first_release:
                                import datetime
                                try:
                                    release_date = datetime.datetime.utcfromtimestamp(first_release).strftime('%Y-%m-%d')
                                except Exception:
                                    pass
                                    
                            min_ram = self._estimate_ram(short_desc, genre)

                        # Se o jogo já estiver na base (ex: fallback local), mesclamos as informações de preço
                        if title_key in self.games_map:
                            existing = self.games_map[title_key]
                            existing.price = "paid"
                            existing.worth = normal_price
                            existing.sale_price = sale_price
                            existing.game_url = deal_url
                            
                            if genre != "Oferta / Promoção":
                                existing.genre = genre
                                existing.tags = list(set(existing.tags + tags))
                                existing.min_ram = min_ram
                                existing.developer = developer
                                existing.thumbnail = thumbnail
                                existing.short_description = short_desc
                        else:
                            game = Game(
                                title=title,
                                genre=genre,
                                tags=tags,
                                platform="PC (Windows)",
                                thumbnail=thumbnail,
                                short_description=short_desc,
                                developer=developer,
                                release_date=release_date,
                                game_url=deal_url,
                                min_ram=min_ram,
                                price="paid",
                                worth=normal_price,
                                sale_price=sale_price
                            )
                            self.games_map[title_key] = game
                            
                    logger.info(f"Sucesso! {len(deals_list)} ofertas processadas e enriquecidas da CheapShark + IGDB.")
                else:
                    logger.warning(f"CheapShark retornou status de resposta: {response.status}")
        except urllib.error.URLError as e:
            logger.error(f"Erro ao acessar CheapShark API: {e.reason}")
        except Exception as e:
            logger.error(f"Erro inesperado na CheapShark: {e}")

    def save_data(self) -> None:
        """Salva a lista consolidada em data/games.js."""
        games_list = [asdict(game) for game in self.games_map.values()]
        
        # Salvaguarda de segurança: se a lista tiver menos de 150 jogos, indica falha grave nas chamadas de APIs.
        # Interrompe para evitar sobrescrever a base saudável no build com dados vazios.
        if len(games_list) < 150:
            raise RuntimeError(
                f"Ingestão abortada: base de dados com apenas {len(games_list)} jogos. "
                "Possível falha de chaves de API (RapidAPI) ou rede no Runner."
            )
        
        # Garante a existência do diretório 'data'
        data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
        os.makedirs(data_dir, exist_ok=True)
        
        file_path = os.path.join(data_dir, "games.js")
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write("window.loadedGamesDatabase = ")
                json.dump(games_list, f, indent=2, ensure_ascii=False)
                f.write(";\n")
            logger.info(f"Dados salvos com sucesso! Total de {len(games_list)} jogos gravados em {file_path}")
        except Exception as e:
            logger.error(f"Erro ao salvar arquivo JS: {e}")

    def build_semantic_model(self) -> None:
        """Treina um modelo LSA (TF-IDF + SVD) sobre o corpus dos jogos e gera data/semantic_model.js."""
        try:
            from sklearn.feature_extraction.text import TfidfVectorizer
            from sklearn.decomposition import TruncatedSVD
            import numpy as np
        except ImportError:
            logger.warning("sklearn/numpy não encontrados. Pulando geração do modelo semântico LSA.")
            return

        logger.info("Iniciando treinamento do modelo semântico LSA...")
        games_list = list(self.games_map.values())
        if not games_list:
            logger.warning("Nenhum jogo disponível para treinar o modelo semântico.")
            return

        # Cria o documento textual de cada jogo para o corpus
        documents = []
        for game in games_list:
            tags_str = " ".join(game.tags) if isinstance(game.tags, list) else ""
            desc = game.short_description or game.description or ""
            doc = f"{game.title} {game.genre} {tags_str} {desc}"
            documents.append(doc)

        # Configura o TfidfVectorizer
        vectorizer = TfidfVectorizer(
            lowercase=True,
            strip_accents="unicode",
            stop_words=None,
            min_df=1
        )
        tfidf_matrix = vectorizer.fit_transform(documents)

        # Reduz as dimensões para 30 conceitos latentes (LSA)
        n_components = min(30, tfidf_matrix.shape[1])
        svd = TruncatedSVD(n_components=n_components, random_state=42)
        lsa_matrix = svd.fit_transform(tfidf_matrix)

        # Normaliza os vetores dos jogos (L2 norm) para facilitar produto escalar na similaridade de cosseno
        norms = np.linalg.norm(lsa_matrix, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        normalized_lsa_matrix = lsa_matrix / norms

        # Extrai vocabulário, IDF e componentes do SVD
        vocab = vectorizer.get_feature_names_out().tolist()
        idf = vectorizer.idf_.tolist()
        components = svd.components_.tolist()

        # Associa cada jogo ao seu vetor correspondente
        game_vectors = {}
        for idx, game in enumerate(games_list):
            title_key = game.title.strip().lower()
            game_vectors[title_key] = normalized_lsa_matrix[idx].tolist()

        # Salva o arquivo Javascript contendo os pesos e vocabulário
        data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
        os.makedirs(data_dir, exist_ok=True)
        file_path = os.path.join(data_dir, "semantic_model.js")

        model_data = {
            "n_components": n_components,
            "vocabulary": vocab,
            "idf": idf,
            "components": components,
            "game_vectors": game_vectors
        }

        try:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write("window.semanticModelDatabase = ")
                json.dump(model_data, f, ensure_ascii=False)
                f.write(";\n")
            logger.info(f"Modelo semântico LSA salvo com sucesso em {file_path}! Vocabulário: {len(vocab)} palavras.")
        except Exception as e:
            logger.error(f"Erro ao salvar arquivo do modelo semântico: {e}")

if __name__ == "__main__":
    ingestor = GamesIngestor()
    ingestor.load_fallback_games()
    ingestor.fetch_freetogame()
    ingestor.fetch_gamerpower()
    ingestor.fetch_cheapshark()
    ingestor.save_data()
    ingestor.build_semantic_model()
