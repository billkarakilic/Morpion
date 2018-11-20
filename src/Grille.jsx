import React, { Component, Fragment } from 'react';
import uniq from "lodash/uniq";
import chunk from "lodash/chunk";
import some from "lodash/some";
import every from "lodash/every";

export default class Grille extends Component{                                                                                  //Met des valeurs par default dans le state
  state = {
    symbol: "X",                                                                                                                   //symbol debut de la partie c'est X
                                                                                                                         //Nombre de coup par joueur
  players: [
      0,
      0
    ],
    cases: (new Array(9)).fill(null),         //cree un tableau avec 9 objet dedans qui sont egaux à null
    playing: false,                             // score egal à 0 pour les deux joueurs
    score: [
      0,
      0
    ],

  }

  componentDidUpdate () {
    const { cases, symbol, playing, score } = this.state;

    if (playing) {                                                  // Si en jeux le chrono va à 0
      setTimeout(() => {
        if (this.checkWin()) {                                        // 0 que la victoire ou qu'il y a victoire
          this.setState({
            playing: false,                                               // alors partie s'arrete
            score: [symbol === "O" ? score[1]+1 : score[1], symbol === "X" ? score[0]+1 : score[0]] // Chriffre chrono
          });
        } else if (every(cases)) {
          this.setState({
            playing: false
          });
        }
      }, 50)
    }

  }

  place = (index) => {
    const { symbol, players, cases , playing } = this.state;

    if (!playing || cases[index] !== null) {
      return null;
    }

    const newCases = [...cases];

    newCases[index] = symbol;
    const newSymbol = symbol === "X" ? "O" : "X";
    const newState = {
      cases: newCases,
      symbol: newSymbol
    }

    if (symbol === "X") {
      newState.players = [players[0]+1, players[1]];
    }
    else {
        newState.players = [players[0], players[1]+1];
    }

    this.setState(newState);
  }

  checkSet (set) {
      var uniqValues = uniq(set);
      if (uniqValues.length === 1 && uniqValues[0]) {
        return true;
      }

      return false
  }

  checkWin() {

    const { cases } = this.state;
    var lines = chunk(cases, 3).map(this.checkSet);

    var columns = chunk(cases, 3)
                    .map((line, i, arr) => [arr[0][i], arr[1][i], arr[2][i]])
                    .map(this.checkSet)

    var diagonales = [ [ cases[0], cases[4], cases[8] ], [ cases[2], cases[4], cases[6] ] ].map(this.checkSet);

    return some(lines) || some(columns)|| some(diagonales);
  }

// _________________________

  replay(){
    const { symbol , cases , players } = this.state;
    this.setState({
      cases: (new Array(9)).fill(null),
      players: [ 0,0 ],
      playing: true
    })
  }
  render(){
    const { symbol, cases , playing  } = this.state;

    var Joueur1 ,Joueur2, Victoire ,className  = "";
    if (symbol === "X") {
      Joueur1 = "actif"
    } else {
      Joueur2 = "actif"
    }
    if (!playing) {
      className = "block";
    }

    return (
      <div className="Grille">
        <ul className="Grille-ul">
          {
            cases.map((value, i) => (
              <li className={Victoire} onClick={() => this.place(i)}>
                <p>{value}</p>
              </li>
            ))
          }
        </ul>
        <div className="info">
          <div className="Joueur">
            <p className={Joueur1}> X Joueur 1 - </p>
            <p className={Joueur2}> O Joueur 2 - </p>
          </div>
          <p>Nombre de coups</p>
          <ul>
            <li>
              <p>{this.state.players[0]}</p>
            </li>
            <li>
              <p>{this.state.players[1]}</p>
            </li>
          </ul>
          <p>Score</p>
          <ul>
            <li>
              <p>{this.state.score[0]}</p>
            </li>
            <li>
              <p>{this.state.score[1]}</p>
            </li>
          </ul>
          {
            !playing && (
              <Fragment>
                <button className={className} onClick={() => this.replay()}>{this.checkWin() ? "Rejouer" : "Jouer"}</button>
                <h1 className={className}>{ this.checkWin() ? "Victoire" : "Egalité" }</h1>
              </Fragment>
            )
          }

        </div>
      </div>
    );
  }
}
