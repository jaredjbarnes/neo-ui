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

// const createStatefulSubjectHook = (useMediatorHook, propertyName) => {
//   return () => {
//     const mediator = useMediator();
//     const [state, setState] = useState();
  
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
  
//     return mediator[propertyName].value;
//   };
// };

// const createAsyncActionStateMachineHook = () => {}


// import useMediator from "./useMediator";
// import createHook from "./createHook";

// const nameHook =  createHook(useMediator, "name");

// export default nameHook;
