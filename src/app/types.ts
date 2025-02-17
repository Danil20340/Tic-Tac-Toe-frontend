// Enums
export enum PlayerStatus {
    ACTIVE = 'ACTIVE',
    BLOCKED = 'BLOCKED',
}

export enum AvailabilityStatus {
    AVAILABLE = 'AVAILABLE',
    IN_GAME = 'IN_GAME',
}

export enum GameStatus {
    ONGOING = 'ONGOING',
    FINISHED = 'FINISHED',
    DRAW = 'DRAW',
}
export enum InviteStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED'
}
export enum Symbol {
    X = 'X',
    O = 'O',
}

export type Player = {
    id: string;
    fullName: string;
    age: number;
    gender: string;
    status: PlayerStatus;
    availability: AvailabilityStatus;
    createdAt: Date;
    updatedAt: Date;
    login: string;
    password: string;
    winRate: string;
    isAdmin: boolean;

    // Relations
    gamesAsPlayer1: Game[];
    gamesAsPlayer2: Game[];
    gamesWinner: Game[];
    chatMessages: ChatMessage[];
    ratings: Rating[];
}

// Game
export type Game = {
    id: string;
    player1: Player;
    player1Id: string;
    player2: Player;
    player2Id: string;
    winner?: Player | null;
    winnerId?: string | null;
    winningPattern?: Array<number> | null;
    lastMoveTime: Date;
    playerSymbol: Symbol;
    status: GameStatus;
    board: any; // JSON type
    nowMove: Symbol;
    chatMessages: ChatMessage[];
    createTime: Date;
    endTime?: Date | null;
}

// ChatMessage
export type ChatMessage = {
    id: string;
    game: Game;
    gameId: string;
    sender: Player;
    senderId: string;
    message: string;
    timestamp: Date;
}

// Rating
export type Rating = {
    id: string;
    playerName: string;
    totalGames: number;
    wins: number;
    losses: number;
    draw: number;
    winPercentage: number;
}