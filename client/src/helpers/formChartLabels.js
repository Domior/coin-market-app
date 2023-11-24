export const formChartLabels = (array, days) =>
  array.map(coin => {
    let date = null;
    if (coin.time) {
      date = new Date(coin.time);
    } else {
      date = new Date(coin[0]);
    }
    const time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;

    return days === 1 ? time : date.toLocaleDateString();
  });
