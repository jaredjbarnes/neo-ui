import { Subject } from "rxjs";

export default class StatefulSubject<T> extends Subject<T> {
  private state: T;

  constructor(defaultState: T) {
    super();
    this.state = defaultState;
  }

  next(value: T) {
    this.state = value;
    return super.next(value);
  }

  getState() {
    return this.state;
  }

  get value() {
    return this.state;
  }

  set value(value: T) {
    this.next(value);
  }

  onChange(callback: (value: T) => void) {
    return this.subscribe({ next: callback });
  }
}

// class Mediator {
//   readonly name = new StatefulSubject("Jared");
// }

// const m = new Mediator();
// m.name.onChange(() => {});
// m.name.value;

// m.name.value = "Brent";

// function createStatefulSubjectHook<T>(useMediatorHook, propertyName) {
//   return () => {
//     const mediator = useMediatorHook();
//     const [state, setState] = useState(mediator[propertyName].value);

//     const subscription = useMemo(() => {
//       return mediator[propertyName].onChange((value) => {
//         setState(value);
//       });
//     }, []);

//     useEffect(() => {
//       return () => {
//         subscription.unsubscribe();
//       };
//     }, [subscription]);

//     return mediator[propertyName].value as T;
//   };
// }

// //import useMediator from "./useMediator";

// import {useContext} from "react";
// import {MediatorContext} from ".Provider";
// import createStatefulSubjectHook from "./createStatefulSubjectHook";

// export const useMediator = ()=>{
//   return useContext(MediatorContext);
// }
// export const nameHook = createStatefulSubjectHook<T>(useMediator, "name");
// export const nameHook = createStatefulSubjectHook<T>(useMediator, "property2");

// export default nameHook;
