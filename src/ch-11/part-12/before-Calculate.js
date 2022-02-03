export function result(orderData) {
  const countryData = {
    shippingRules: {
      KR: 1000,
      JP: 100,
      US: 1,
    },
  };

  const costStatus = calculateShippingCosts(orderData);
  const errorList = [];

  if (costStatus < 0) {
    errorList.push({
      order: orderData,
      errorCode: costStatus,
    });
  }

  function localShippingRules(country) {
    const data = countryData.shippingRules[country];

    if (data) {
      return data;
    } else {
      return -23;
    }
  }

  function calculateShippingCosts(anOrder) {
    // 관련 없는 코드
    const shippingRules = localShippingRules(anOrder.country);

    return shippingRules;

    // 더 관련 없는 코드
  }
  return { costStatus, errorList };
}
