export const schema = {
  FECHA: {
    type: Date,
    prop: "date",
  },
  LIGA: {
    type: String,
    prop: "liga",
  },
  JUGADA: {
    type: String,
    prop: "game",
  },
  "CUOTA 1": {
    type: (value: string) => {
      if (!value) return;
      const coute = value.toString();
      return coute;
    },
    prop: "coute1",
  },
  "CUOTA 2": {
    type: (value: number) => {
      const coute = value.toString();
      return coute;
    },
    prop: "coute2",
  },
  "CUOTA X": {
    type: (value: number) => {
      const coute = value.toString();
      return coute;
    },
    prop: "couteX",
  },
  "HORA DE JUEGO": {
    type: (value: Date) => {
      const time = value.toUTCString().replace(" GMT", "");
      const res = new Date(time);
      return `${res.getHours() < 10 ? `0${res.getHours()}` : res.getHours()}:${
        res.getMinutes() < 10 ? `0${res.getMinutes()}` : res.getMinutes()
      }`;
    },
    prop: "time",
  },
  "Draw %": {
    type: String,
    prop: "draw",
  },
  "Total Score Prediction": {
    type: String,
    prop: "prediction",
  },
  "Over 1.5 goals %": {
    type: String,
    prop: "over1.5",
  },
  "Over 2.5 goals %": {
    type: String,
    prop: "over2.5",
  },
  "BTTS %": {
    type: String,
    prop: "btts",
  },
  "1st Half Score Prediction": {
    type: String,
    prop: "1HalfScorePrediction",
  },
  "1st Half Over 0.5 goals %": {
    type: String,
    prop: "1HalfOver0.5Goals",
  },
  "1st Half Over 1.5 goals %": {
    type: String,
    prop: "1HalfOver1.5Goals",
  },
  "2nd Half Over 0.5 goals %": {
    type: String,
    prop: "2HalfOver0.5Goals",
  },
  "2nd Half Over 1.5 goals %": {
    type: String,
    prop: "2HalfOver1.5Goals",
  },
} as any;
