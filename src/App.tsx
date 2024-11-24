import { useState } from 'react'
import './index.css'
import { Button } from './components/ui/button'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex w-[100vw] h-full'>
      <div className='m-auto'>
        <h1>Hello World</h1>
        <p>Count: {count}</p>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </div>
    </div>
  )
}
