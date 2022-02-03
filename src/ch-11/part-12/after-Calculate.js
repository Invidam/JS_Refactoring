export function result(orderData) {
  const countryData = {
    shippingRules: {
      KR: 1000,
      JP: 100,
      US: 1,
    },
  };
  const errorList = [];
  let costStatus;
  try {
    costStatus = calculateShippingCosts(orderData);
  } catch (error) {
    if (error instanceof OrderProcessingError)
      errorList.push({
        order: orderData,
        errorCode: error.code,
      });
    else throw error;
  }

  function localShippingRules(country) {
    const data = countryData.shippingRules[country];

    if (data) {
      return data;
    } else {
      throw new OrderProcessingError(-23);
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

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super(`주문 처리 오류: ${errorCode}`);
    this.code = errorCode;
  }
  get name() {
    return "OrderProcessingError";
  }
}
