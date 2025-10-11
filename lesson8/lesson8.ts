function useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
  let state = initialValue;

  const getter = () => {
    //this fn must just return state
    return state;
  };

  const setter = (newValue: T) => {
    // this fn must accept newValue and update state
    state = newValue;
    return state;
  };
  return [getter, setter];
}
console.log('\n--- useState Replica ---');

const [getCount, setCount] = useState(0);
console.log('Initial count:', getCount());
setCount(5);
console.log('After setCount(5)', getCount());
setCount(10);
console.log('After setCount(10):', getCount());

console.log();

const [getName, setName] = useState('Alice');
console.log('Initial name:', getName());
setName('Bob');
console.log('After setName("Bob"):', getName());
console.log('Count is still:', getCount());
