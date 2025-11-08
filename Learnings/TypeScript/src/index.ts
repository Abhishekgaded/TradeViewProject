// let Obj1: {
//   id: number,
//   name: string,
//   retire: (date: Date) => void
// } = {
//   id: 1,
//   name: 'Shankernag',
//   retire: (date: Date) => {
//     console.log(date)
//   }
// }

// console.log(Obj1)
///////////////////////////////////////
//Type aliasis

// type Employee = {
//   id: number,
//   name: string,
//   retire: (date: Date) => void
// }

// console.log(Employee)
////////////////////////
//Union Types
// function kgtolbs(weight: number | string) {
//   if (typeof (weight) === 'number')
//     return weight = weight * 2.2;
//   return Math.floor(parseInt(weight) * 2.2);
// }

// console.log(kgtolbs('44'))
//////////////////////////////
//Intersection Types

// type Draggable = {
//   drag: () => void
// }

// type Resizable = {
//   resizeable: () => void
// }

// type UIWidget = Draggable & Resizable;

// let textBox: UIWidget = {
//   drag: () => { },
//   resizeable: () => { }

// }
///////////////////////////////
//Literal Types

// type Quantity = 50 | 100;
// let quantiy: Quantity = 100;

// type Metric = 'cm' | 'inch'

//Nullable Types
// function Greet(name: string | null) {
//   if (name) {
//     console.log(name.toUpperCase())
//   }
// }

// Greet('Ajay')
//Optional Chaining

// type Customer = {
//   birthday: Date
// }

// function getCustomer(id: number): Customer | null {
//   return id === 0 ? null : { birthday: new Date() }
// }

// let Customer = getCustomer(1);

// console.log(Customer)

// function infiniteLoops() {
//   while (true) {
//     console.log('Here We go again');
//   }
// }

// console.log(infiniteLoops());

// type Shape = 'circle' | 'rectangle';

// function draw(shape: Shape) {
//   switch (shape) {
//     case 'circle': console.log('The shape is Circle');
//     case 'rectangle': console.log('The shape is rectangle');
//     default:
//       const _exhaustive: any = shape;
//   }
// }

// console.log(draw('circle'));
// console.log(draw('rectangle'));

// function wrap<T>(value: T): T {
//   return value;
// }

// console.log(wrap(12));
// wrap(12);



// type T = {a:string,b:number,c:boolean};
// type keys = keyof T;


// type User = { name: string }
// type Admin = { name: string, role: 'Admin' };
// function printUser(u: User | Admin) {
//   if ("role" in u) {
//     console.log("Admin :", u.role);
//   } else {
//     console.log("User :", u.name);
//   }
// }

// printUser({ name: "Abhi" });
// printUser({ name: "Abhi", role: "Admin" });

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape) {
  if (shape.kind === "circle") {
    return shape.radius * shape.radius * Math.PI;
  } else {
    return shape.side * shape.side;
  }
}

function draw(shape: Shape) {
  console.log(shape.radius);
}

function invalid(shape: Shape) {
  if (shape.kind === "circle") {
    console.log(shape.side);  // ❌
  }
}
