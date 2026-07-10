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
                        # Processa apenas brindes ativos
                        if item.get("status") != "Active":
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

    def fetch_cheapshark(self) -> None:
        """Busca ofertas ativas de jogos de PC pagos na CheapShark API e cruza com a Steam API para metadados ricos."""
        import time
        import re
        logger.info("Buscando ofertas de jogos PC na CheapShark API...")
        # Buscamos as top 30 ofertas ordenadas por desconto/economia
        url = "https://www.cheapshark.com/api/1.0/deals?pageSize=30"

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

                    logger.info(f"Carregadas {len(deals_list)} ofertas iniciais da CheapShark. Cruzando com Steam API...")

                    for idx, item in enumerate(deals_list):
                        title_key = item.get("title", "").strip().lower()
                        if not title_key:
                            continue

                        normal_price = f"${item.get('normalPrice')}"
                        sale_price = f"${item.get('salePrice')}"
                        savings = float(item.get("savings", "0"))
                        deal_url = f"https://www.cheapshark.com/redirect?dealID={item.get('dealID')}"
                        steam_app_id = item.get("steamAppID")
                        
                        # Valores padrão de fallback para o jogo da CheapShark
                        genre = "Oferta / Promoção"
                        tags = ["promo", "oferta", "deals"]
                        short_desc = f"Super Oferta PC! De {normal_price} por apenas {sale_price} ({savings:.0f}% de desconto)."
                        thumbnail = item.get("thumb", "")
                        developer = "Steam Store Deals"
                        release_date = "N/A"
                        min_ram = 8

                        # Se possui ID da Steam válido, cruza com os detalhes ricos da Steam
                        if steam_app_id and steam_app_id != "0":
                            logger.info(f"[{idx+1}/{len(deals_list)}] Cruzando metadados de '{item.get('title')}' (Steam ID: {steam_app_id})...")
                            steam_url = f"https://store.steampowered.com/api/appdetails?appids={steam_app_id}"
                            
                            try:
                                steam_req = urllib.request.Request(
                                    steam_url,
                                    headers={
                                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                                    }
                                )
                                # Adiciona um pequeno delay de 0.4s para evitar rate limiting da Steam
                                time.sleep(0.4)
                                
                                with urllib.request.urlopen(steam_req, timeout=10) as steam_res:
                                    if steam_res.status == 200:
                                        steam_data = json.loads(steam_res.read().decode("utf-8"))
                                        
                                        if steam_app_id in steam_data and steam_data[steam_app_id].get("success", False):
                                            game_info = steam_data[steam_app_id]["data"]
                                            
                                            # Extrai gêneros e tags reais da Steam!
                                            steam_genres = [g.get("description", "") for g in game_info.get("genres", [])]
                                            if steam_genres:
                                                genre = steam_genres[0]
                                                tags = [g.lower() for g in steam_genres if g] + ["promo", "oferta", "deals"]
                                            
                                            # Extrai descrição curta real
                                            if game_info.get("short_description"):
                                                short_desc = game_info.get("short_description")
                                            
                                            # Extrai desenvolvedores
                                            devs = game_info.get("developers", [])
                                            if devs:
                                                developer = devs[0]
                                                
                                            # Extrai data de lançamento
                                            release = game_info.get("release_date", {})
                                            if release.get("date"):
                                                release_date = release.get("date")

                                            # Extrai min_ram das especificações do PC (Regex)
                                            min_req = game_info.get("pc_requirements", {}).get("minimum", "")
                                            ram_match = re.search(r"(\d+)\s*GB\s*RAM", min_req, re.IGNORECASE)
                                            if ram_match:
                                                min_ram = int(ram_match.group(1))
                                                
                            except Exception as steam_err:
                                logger.warning(f"Falha ao obter metadados da Steam para '{item.get('title')}': {steam_err}")

                        # Se o jogo já estiver na base (ex: fallback local), mesclamos as informações de preço
                        if title_key in self.games_map:
                            existing = self.games_map[title_key]
                            existing.price = "paid"
                            existing.worth = normal_price
                            existing.sale_price = sale_price
                            existing.game_url = deal_url
                            
                            # Atualiza metadados se conseguimos na Steam
                            if genre != "Oferta / Promoção":
                                existing.genre = genre
                                existing.tags = list(set(existing.tags + tags))
                                existing.min_ram = min_ram
                                existing.developer = developer
                        else:
                            game = Game(
                                title=item.get("title"),
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
                            
                    logger.info(f"Sucesso! {len(deals_list)} ofertas processadas e enriquecidas da CheapShark + Steam.")
                else:
                    logger.warning(f"CheapShark retornou status de resposta: {response.status}")
        except urllib.error.URLError as e:
            logger.error(f"Erro ao acessar CheapShark API: {e.reason}")
        except Exception as e:
            logger.error(f"Erro inesperado na CheapShark: {e}")

    def save_data(self) -> None:
        """Salva a lista consolidada em data/games.json."""
        games_list = [asdict(game) for game in self.games_map.values()]
        
        # Garante a existência do diretório 'data'
        data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
        os.makedirs(data_dir, exist_ok=True)
        
        file_path = os.path.join(data_dir, "games.json")
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(games_list, f, indent=2, ensure_ascii=False)
            logger.info(f"Dados salvos com sucesso! Total de {len(games_list)} jogos gravados em {file_path}")
        except Exception as e:
            logger.error(f"Erro ao salvar arquivo JSON: {e}")

if __name__ == "__main__":
    ingestor = GamesIngestor()
    ingestor.load_fallback_games()
    ingestor.fetch_freetogame()
    ingestor.fetch_gamerpower()
    ingestor.fetch_cheapshark()
    ingestor.save_data()
