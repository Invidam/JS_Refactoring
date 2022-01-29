// 이전
class Clock {
  constructor(date) {
    this.today = date || new Date();
    // this.today = d
  }
}
const clock = new Clock();
function printOwing(invoice) {
  let outstanding = 0;

  console.log("*****************");
  console.log("**** 고객 채무 ****");
  console.log("*****************");

  // 미해결 채무 (outstanding)를 계산한다.
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // 마감일 (dueState)을 기록한다.
  const today = clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  // 세부 사항을 출력한다.{
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice?.dueDate?.toLocaleDateString("ko-KR")}`);
}

const invoice = {
  customer: "Invidam",
  orders: [{ amount: 300 }, { amount: 500 }, { amount: 1000 }],
};

printOwing(invoice);

// 이후
class Clock {
  constructor(date) {
    this.today = date || new Date();
    // this.today = d
  }
}
const clock = new Clock();
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);

  const today = clock.today;
  recordDueDate(invoice);

  printDetails(invoice, outstanding);

  function printBanner() {
    console.log("*****************");
    console.log("**** 고객 채무 ****");
    console.log("*****************");
  }

  function calculateOutstanding(invoice) {
    let result = 0;
    for (const o of invoice.orders) {
      result += o.amount;
    }
    return result;
  }

  function recordDueDate(invoice) {
    invoice.dueDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 30
    );
  }

  function printDetails(invoice, outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice?.dueDate?.toLocaleDateString("ko-KR")}`);
  }
}

const invoice = {
  customer: "Invidam",
  orders: [{ amount: 300 }, { amount: 500 }, { amount: 1000 }],
};

printOwing(invoice);
