import { useState,useCallback, useEffect,useRef} from 'react'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+= "!#$%&'*+,-./:;<=>?@^_`{|}~"

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },
  [length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
   <div className='w-full max-w-md mx-auto
   shadow-md rounded-lg p-4 my-8 bg-gray-800'>
    <h1 className='text-white text-center py-2 text-xl'>Password generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3 bg-gray-50 '
      ref={passwordRef}
      placeholder='password'
      readOnly
      />

      <button className='outline-none bg-blue-700 cursor-pointer
       text-white px-3  py-0.5 shrink-0'
       onClick={copyPasswordToClipboard}>Copy</button>
    </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'></div>
        <input 
        type="range"
        min={6}
        max={50} 
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
         />
         <label className='text-orange-500'>Length: {length}</label>
     </div>
     <div className='flex items-center gap-x-1'>
      <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=> {
          setNumberAllowed((prev) => !prev)
      }}
      />
      <label htmlFor='numberInput' className='text-orange-500'>number</label>
     </div>

      <div className='flex items-center gap-x-1'>
      <input 
        type="checkbox"
        defaultChecked={charAllowed}
        id='charInput'
        onChange={()=> {
        setCharAllowed((prev) => !prev)
      }}
      />
      <label htmlFor='charInput' className='text-orange-500'>Character</label>
     </div>
   </div>
    </>
  )
}

export default App
