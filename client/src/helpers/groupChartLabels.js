export const groupChartLabels = (data, intervalInMilliseconds) => {
  const groupedData = [];
  let currentInterval = {
    time: null,
    data: [],
  };

  for (let i = 0; i < data.length; i++) {
    const timestamp = data[i][0];
    const price = data[i][1];

    // Initialize the start time if it's the first iteration
    if (!currentInterval.time) {
      const startTime = Math.floor(timestamp / intervalInMilliseconds) * intervalInMilliseconds; // Get the initial interval start time
      currentInterval.time = startTime;
      currentInterval.data.push(price);
    } else {
      // Check if the current timestamp is within the interval
      const timeDifference = timestamp - currentInterval.time;
      if (timeDifference <= intervalInMilliseconds) {
        currentInterval.data.push(price);
      } else {
        // Calculate open and close prices for the interval
        groupedData.push({
          time: currentInterval.time,
          data: [currentInterval.data[0], currentInterval.data[currentInterval.data.length - 1]],
        });

        // Move to the next interval
        const nextIntervalStart = currentInterval.time + intervalInMilliseconds;
        currentInterval = {
          time: nextIntervalStart,
          data: [price],
        };
      }
    }
  }

  // Add the last interval if it's not complete
  if (currentInterval.data.length > 0) {
    groupedData.push({
      time: currentInterval.time,
      data: [currentInterval.data[0], currentInterval.data[currentInterval.data.length - 1]],
    });
  }

  return groupedData;
};
