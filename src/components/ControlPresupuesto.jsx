import {useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
    gastos, 
    presupuesto, 
    setGastos,
    setPresupuesto,
    setIsValidPresupuesto
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
    setGastado(totalGastado)
    setDisponible(totalDisponible)
    setPorcentaje(nuevoPorcentaje)
  }, [gastos])
  

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
  }

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuesto y/o gastos');
    if(resultado){
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
    }
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                value={porcentaje}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#C23B22' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#C23B22' : '#3b82f6',
                    pathTransitionDuration: 1.2
                })}
                text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button
                className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetar App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo': ''}`}>
                <span>{`${disponible < 0 ? 'Déficit': 'Disponible'}`}: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto