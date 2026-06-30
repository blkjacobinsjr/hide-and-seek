import { Injectable } from '@nestjs/common';

type RoomId = string;
type PlayerId = string;
type State = 'waiting' | 'playing' | 'finished';

// describes one stored room so typescript can catch wrong property names like `State`
interface GameState {
  state: State;
  clientIds: PlayerId[];
}

@Injectable()
export class GameService {
  // stores rooms by id so later code can look up one match without searching an array
  private readonly rooms = new Map<RoomId, GameState>();
  // remembers the one open room so the next player can join it instead of creating a new room
  private waitingRoomId: RoomId | null = null;

  addPlayerToRoom(playerId: PlayerId) {
    // creates a new variable; removing `const` would leave `roomId` undeclared
    const roomId = crypto.randomUUID();
    // next step: use waitingRoomId before creating a new room, otherwise every player gets isolated
    

    // writes the first draft room state into the map so we have real stored data to inspect
    this.rooms.set(roomId, {
      state: 'waiting',
      clientIds: [playerId],
    });

    return roomId;
  }
}
