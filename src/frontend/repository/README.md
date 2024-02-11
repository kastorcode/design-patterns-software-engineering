## Repository
Separates data access logic from business logic in an application by introducing an intermediary called repository that handles all operations related to storing and retrieving data.
```js
class Player {
  constructor ({ id, name, num }) {
    this.id = id
    this.name = name
    this.num = num
  }
}

class PlayerRepository {
  constructor ({ players }) {
    this.players = players
  }
  getAllPlayers () {
    return this.players
  }
  addPlayer (player) {
    return this.players.push(player)
  }
  findPlayerById (playerId) {
    return this.players.find(({ id }) => id === playerId) || null
  }
  removePlayerById (playerId) {
    const index = this.players.findIndex(({ id }) => id === playerId)
    if (index === -1) return null
    return this.players.splice(index, 1)[0]
  }
}

const playerRepository = new PlayerRepository({ players: [] })

playerRepository.addPlayer(new Player({
  id: 30, name: 'Lionel Messi', num: 10
}))
playerRepository.addPlayer(new Player({
  id: 8, name: 'Xavi Hernández', num: 6
}))
playerRepository.addPlayer(new Player({
  id: 6, name: 'Andrés Iniesta', num: 8
}))

const idList = [30, 8, 6, 11]

idList.forEach(id => {
  console.log(playerRepository.findPlayerById(id))
})
```