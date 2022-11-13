import React from 'react'
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list'
import style from 'react-swipeable-list/dist/styles.css';
import { formatearFecha } from '../helpers'
import IconAhorro from '../assets/img/icono_ahorro.svg'
import IconCasa from '../assets/img/icono_casa.svg'
import IconComida from '../assets/img/icono_comida.svg'
import IconGastos from '../assets/img/icono_gastos.svg'
import IconOcio from '../assets/img/icono_ocio.svg'
import IconSalud from '../assets/img/icono_salud.svg'
import IconSuscripciones from '../assets/img/icono_suscripciones.svg'

const diccionarioIconos = {
    ahorro: IconAhorro,
    casa: IconCasa,
    comida: IconComida,
    gastosVarios: IconGastos,
    ocio: IconOcio,
    salud: IconSalud,
    suscripciones: IconSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
  const {categoria, nombre, cantidad, id, fecha} = gasto;
  const leadingActions = () => (
    <LeadingActions>
        <SwipeAction onClick={() => setGastoEditar(gasto) }>
            Editar
        </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction 
            onClick={() => eliminarGasto(id)}
            destructive={true}
        >
            Eliminar
        </SwipeAction>
    </TrailingActions>
  )
  return (
    <SwipeableList>
        <SwipeableListItem 
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className='gasto sombra'>
                <div className='contenido-gasto'>
                    <img
                        src={diccionarioIconos[categoria]}
                        alt="icono gasto"
                    />
                    <div className='descripcion-gasto'>
                        <p className='categoria'>
                            {categoria}
                        </p>
                        <p className='nombre-gasto'>
                            {nombre}
                        </p>
                        <p className='fecha-gasto'>
                            Agregado el: <span>{formatearFecha(fecha)}</span>
                        </p>
                    </div>
                </div>
                <p className='cantidad-gasto'>
                    ${cantidad}
                </p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto