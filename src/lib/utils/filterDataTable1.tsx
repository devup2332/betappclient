import { useEffect, useState } from "react";
import { ItemDataExcel } from "../models/itemDataExcel";

const usePlays = (data: ItemDataExcel[]) => {
  const [table1, setTable1] = useState<ItemDataExcel[]>([]);

  const getDataTable1 = () => {
    if (data.length < 1) return;
    const res = data.filter((play) => {
      const t1 = play.prediction.split(":")[0];
      const t2 = play.prediction.split(":")[1];
      return t1 == t2;
    });
    const dataWithDate = setDateField(res);
    const dataWithCombination = setCombination(dataWithDate);
    console.log("DATA", dataWithCombination);
    setTable1(dataWithCombination);
  };

  const setDateField = (rows: ItemDataExcel[]) => {
    const res = rows.map((play) => {
      const newPlay = { ...play };
      const date = new Date(
        `${(play.date as string).split("T")[0]}T${play.time}:00`
      );
      delete newPlay.time;
      return { ...newPlay, date };
    });
    return res;
  };

  const setCombination = (rows: ItemDataExcel[]) => {
    const combinations: number[] = [];
    let counter = 1;
    rows.forEach((play, ind) => {
      if (ind === 0) {
        combinations.push(counter);
        return counter++;
      }

      for (let i = ind - 1; i >= 0; i--) {
        //Major or equal to 2hours
        if (
          (play.date as Date).getTime() - (rows[i]?.date as Date)?.getTime() >=
          7200000
        ) {
          counter = 1;
          combinations.push(counter);
          return counter++;
        }
        //Minor to 2hours
        if (
          (play.date as Date).getTime() - (rows[ind]?.date as Date)?.getTime() <
          7200000
        ) {
          if (combinations[i] === 1) {
            combinations.push(counter);
            return counter++;
          }
        }
      }
    });
    const repeted: { [key: string]: number } = {};
    combinations.forEach((comb) => {
      const key = comb.toString();
      if (!repeted[key]) {
        return (repeted[key] = 1);
      }
      repeted[key]++;
    });

    Object.values(repeted).forEach((rep) => {
      const porcentage = (rep * 100) / combinations.length;
      if (porcentage >= 30) {
      }
    });
    return rows.map((play, ind) => {
      return { ...play, combination: combinations[ind] };
    });
  };

  useEffect(() => {
    getDataTable1();
  }, [data]);

  return {
    table1,
  };
};

export default usePlays;
