import './App.css';

import { useEffect, useState } from 'react';


import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

function App() {  


  const [type, setType] = useState("value")
  const [val, setVal] = useState(1)
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(7)

  const [dataset, setDataset] = useState([])
  const [dataset2, setDataset2] = useState([])



  function findLst(nb) {
    if (nb <= 0) return [0]
    let lst = []
    
    for (let i = 0; i < 500; i++) {
    
    lst.push(nb)
    
    if (nb % 2 === 0) {
      nb = nb / 2;
      
    } else {
      nb = 3* nb + 1
      
    }
  
    if (nb === 1) {
      lst.push(1)
      return lst
    }
  }

  return lst

}



  useEffect(() => { 
    if (val === "") {
      return [0]
    }else if (val <= 0) {
      setVal(1)
    }
    setDataset(findLst(Number(val)))

  }, [val])

  useEffect(() => {
    if (Number(max) > Number(min)+50) setMax(Number(min)+50)


    var list = [];
    for (var i = Number(min); i <= Number(max); i++) {
      list.push(i);
}
    let allDatasets = list.map((elt) => findLst(elt))


    let bestLenght = 0

    for (let i in allDatasets) {
      if (allDatasets[i].length > bestLenght) bestLenght = allDatasets[i].length
    }



    let data2 = {
      labels: [...Array(bestLenght).keys()],
  datasets: [
  ],
  }

  for (let i in allDatasets) {
    data2.datasets.push({
      label: String(allDatasets[i][0]),
      data: allDatasets[i],
      borderWidth: 5,
      borderColor: `rgba(${50 + Math.floor(Math.random() * 200)}, ${50 + Math.floor(Math.random() * 200)}, ${50 + Math.floor(Math.random() * 200)}, 0.5)`,
      backgroundColor: 'rgba(00, 90, 90, 0.2)',
    })
  }


    setDataset2(data2)

  }, [min, max])


  const options = {
    maintainAspectRatio: false,
    tension: .2,
    legend: {
      display: false
   },

    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
          drag: {
            enabled: true
          },
          pan: {
            enabled: true,
            modifierKey: "ctrl"

          }
        }
      }
    }
  }

  const data = {
    labels: [...Array(dataset.length).keys()],
datasets: [
{
  label: '3x+1',
  data: dataset,
  borderWidth: 5,
  borderColor: 'rgb(00, 150, 150)',
  backgroundColor: 'rgba(00, 90, 90, 0.5)',
}
],
}
let data2 = data


  return (
    <div>
      <h1>Type:</h1>
      <label htmlFor='val'>Value</label>
      <input type="radio" id='val' checked={type === "value" ? true : false} onClick={() => setType("value")}/>
      <label htmlFor='range'>Range</label>
      <input type="radio" id="range" checked={type === "value" ? false : true} onClick={() => setType("range")}/>



      {type === "value" && <input type="number" placeholder='value' value={val} onChange={(e)=>setVal(e.target.value)}/>}
      {type === "value" && <button onClick={()=>setVal(Number(val)+1)}>+</button>}
      {type === "value" && <button onClick={()=> val > 1 ? setVal(Number(val)-1) : null}>-</button>}
      
      {type === "value" && <div className='line'><Line options={options} data={data} /></div>}
      

      {type !== "value" &&<input type="number" placeholder='min' value={min} onChange={(e)=>setMin(e.target.value)}/>}
      {type !== "value" &&<input type="number" placeholder='max' value={max} onChange={(e)=>setMax(e.target.value)}/>}
      
      {type !== "value" && <div className='line'><Line options={options} data={dataset2}/></div>}

    </div>
  );
}

export default App;
