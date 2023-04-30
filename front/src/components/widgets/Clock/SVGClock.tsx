import { format } from 'date-fns'
import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AnalogClockConfigType } from './ClockType'

const TIMER_PRECISION = 250

interface SVGClockProps {
  config: AnalogClockConfigType
}

const SVGClock: React.FC<SVGClockProps> = ({ config }) => {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      if (time.getSeconds() !== now.getSeconds()) {
        setTime(now)
      }
    }, TIMER_PRECISION)

    return () => clearInterval(interval)
  }, [time])

  // TODO isDark implementation
  const isDark = config.style === 'dark'

  const hoursDeg = ((time.getHours() % 12) * 60 + time.getMinutes()) * 0.5
  const minutesDeg = (time.getMinutes() * 60 + time.getSeconds()) * 0.1
  const secondsDeg = time.getSeconds() * 6
  console.log(time, time.getSeconds(), secondsDeg)

  return (
    <Clock>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 1.5,
        }}
      >
        <g id="Face" transform="matrix(1.0674,0,0,1.0674,-30.0961,-51.4044)">
          <circle
            cx={507.865}
            cy={527.828}
            r={457.885}
            style={{
              fill: 'white',
            }}
          />
          <clipPath id="_clip1">
            <circle cx={507.865} cy={527.828} r={457.885} />
          </clipPath>
          <g clipPath="url(#_clip1)">
            <g transform="matrix(0.81134,0.468428,-0.468428,0.81134,332.294,-127.413)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(0.468428,0.81134,-0.81134,0.468428,683.437,-127.413)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign1" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(2.22045e-16,0.936855,-0.936855,2.22045e-16,987.535,48.1585)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign2" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(-0.468428,0.81134,-0.81134,-0.468428,1163.11,352.257)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign3" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(-0.81134,0.468428,-0.468428,-0.81134,1163.11,703.4)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign4" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(-0.936855,-1.66533e-16,1.66533e-16,-0.936855,987.535,1007.5)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign5" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(-0.81134,-0.468428,0.468428,-0.81134,683.437,1183.07)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign6" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(-0.468428,-0.81134,0.81134,-0.468428,332.294,1183.07)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign7" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(-1.11022e-16,-0.936855,0.936855,-1.11022e-16,28.1957,1007.5)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign8" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(0.468428,-0.81134,0.81134,0.468428,-147.376,703.4)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign9" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(0.81134,-0.468428,0.468428,0.81134,-147.376,352.257)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign10" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g transform="matrix(0.936855,0,0,0.936855,28.1957,48.1585)">
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'white',
                  fillOpacity: 0,
                }}
              />
              <g id="sign11" transform="matrix(1,0,0,1,3.55271e-15,-664.714)">
                <path
                  d="M512,700.897L512,753.023"
                  style={{
                    fill: 'none',
                    stroke: 'rgb(0,1,0)',
                    strokeWidth: 5,
                  }}
                />
              </g>
              <rect
                x={23.253}
                y={23.253}
                width={977.493}
                height={977.493}
                style={{
                  fill: 'none',
                  stroke: 'rgb(0,1,0)',
                  strokeOpacity: 0,
                  strokeWidth: 5,
                }}
              />
            </g>
            <g id="personalary" transform="matrix(0.936855,0,0,0.936855,46.4406,117.849)">
              <path
                d="M366.837,685.105C362.661,685.105 359.157,686.929 357.093,690.289L357.093,685.297L353.829,685.297L353.829,719.857L357.237,719.857L357.237,705.793C359.349,709.057 362.805,710.785 366.837,710.785C374.037,710.785 379.413,705.601 379.413,697.921C379.413,690.289 374.037,685.105 366.837,685.105ZM366.597,707.761C361.221,707.761 357.189,703.825 357.189,697.921C357.189,692.065 361.221,688.081 366.597,688.081C371.925,688.081 376.005,692.065 376.005,697.921C376.005,703.825 371.925,707.761 366.597,707.761Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <path
                d="M408.405,697.921C408.405,690.337 403.269,685.105 396.165,685.105C389.061,685.105 383.829,690.433 383.829,697.921C383.829,705.409 389.205,710.785 397.077,710.785C401.061,710.785 404.565,709.345 406.821,706.657L404.901,704.449C402.981,706.657 400.245,707.761 397.173,707.761C391.653,707.761 387.621,704.257 387.237,698.977L408.357,698.977C408.357,698.593 408.405,698.209 408.405,697.921ZM396.165,688.033C401.109,688.033 404.709,691.489 405.141,696.433L387.237,696.433C387.669,691.489 391.269,688.033 396.165,688.033Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <path
                d="M418.629,690.241L418.629,685.297L415.365,685.297L415.365,710.545L418.773,710.545L418.773,697.681C418.773,691.729 421.989,688.369 427.269,688.369C427.509,688.369 427.797,688.417 428.085,688.417L428.085,685.105C423.429,685.105 420.213,686.881 418.629,690.241Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <path
                d="M441.189,710.785C447.765,710.785 451.605,707.953 451.605,703.585C451.605,693.889 435.237,699.025 435.237,692.209C435.237,689.809 437.253,688.033 441.813,688.033C444.405,688.033 447.045,688.657 449.253,690.193L450.741,687.457C448.629,686.017 445.077,685.105 441.813,685.105C435.381,685.105 431.829,688.177 431.829,692.305C431.829,702.289 448.197,697.105 448.197,703.681C448.197,706.177 446.229,707.809 441.429,707.809C437.877,707.809 434.469,706.561 432.453,704.977L430.917,707.665C432.981,709.441 437.013,710.785 441.189,710.785Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <path
                d="M468.213,710.785C475.605,710.785 481.029,705.409 481.029,697.921C481.029,690.433 475.605,685.105 468.213,685.105C460.821,685.105 455.349,690.433 455.349,697.921C455.349,705.409 460.821,710.785 468.213,710.785ZM468.213,707.761C462.837,707.761 458.805,703.825 458.805,697.921C458.805,692.017 462.837,688.081 468.213,688.081C473.589,688.081 477.573,692.017 477.573,697.921C477.573,703.825 473.589,707.761 468.213,707.761Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <path
                d="M500.853,685.105C496.485,685.105 493.077,686.881 491.253,689.953L491.253,685.297L487.989,685.297L487.989,710.545L491.397,710.545L491.397,697.297C491.397,691.537 494.805,688.177 500.229,688.177C505.029,688.177 507.813,690.913 507.813,696.241L507.813,710.545L511.221,710.545L511.221,695.905C511.221,688.657 506.997,685.105 500.853,685.105Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <path
                d="M529.317,685.105C525.333,685.105 521.589,686.353 519.045,688.513L520.581,691.057C522.645,689.233 525.717,688.081 528.981,688.081C533.685,688.081 536.133,690.433 536.133,694.753L536.133,696.289L528.117,696.289C520.869,696.289 518.373,699.553 518.373,703.441C518.373,707.809 521.877,710.785 527.589,710.785C531.765,710.785 534.741,709.201 536.277,706.609L536.277,710.545L539.541,710.545L539.541,694.897C539.541,688.369 535.845,685.105 529.317,685.105ZM528.117,708.097C524.085,708.097 521.733,706.273 521.733,703.345C521.733,700.753 523.317,698.833 528.213,698.833L536.133,698.833L536.133,702.961C534.789,706.273 531.957,708.097 528.117,708.097Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <rect
                x={548.805}
                y={674.929}
                width={3.408}
                height={35.616}
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <path
                d="M570.549,685.105C566.565,685.105 562.821,686.353 560.277,688.513L561.813,691.057C563.877,689.233 566.949,688.081 570.213,688.081C574.917,688.081 577.365,690.433 577.365,694.753L577.365,696.289L569.349,696.289C562.101,696.289 559.605,699.553 559.605,703.441C559.605,707.809 563.109,710.785 568.821,710.785C572.997,710.785 575.973,709.201 577.509,706.609L577.509,710.545L580.773,710.545L580.773,694.897C580.773,688.369 577.077,685.105 570.549,685.105ZM569.349,708.097C565.317,708.097 562.965,706.273 562.965,703.345C562.965,700.753 564.549,698.833 569.445,698.833L577.365,698.833L577.365,702.961C576.021,706.273 573.189,708.097 569.349,708.097Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <path
                d="M593.301,690.241L593.301,685.297L590.037,685.297L590.037,710.545L593.445,710.545L593.445,697.681C593.445,691.729 596.661,688.369 601.941,688.369C602.181,688.369 602.469,688.417 602.757,688.417L602.757,685.105C598.101,685.105 594.885,686.881 593.301,690.241Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
              <path
                d="M627.861,685.297L618.357,706.753L608.853,685.297L605.301,685.297L616.581,710.497L615.477,712.945C614.037,716.113 612.501,717.169 610.245,717.169C608.421,717.169 606.885,716.497 605.637,715.249L604.053,717.793C605.589,719.329 607.845,720.097 610.197,720.097C613.797,720.097 616.485,718.513 618.597,713.569L631.221,685.297L627.861,685.297Z"
                style={{
                  fillRule: 'nonzero',
                }}
              />
            </g>
          </g>
          <circle
            cx={507.865}
            cy={527.828}
            r={457.885}
            style={{
              fill: 'none',
              stroke: 'black',
              strokeWidth: '4.68px',
            }}
          />
        </g>
        <g id="minutes" style={{ transform: `rotateZ(${minutesDeg}deg)`, transformOrigin: 'center' }}>
          <rect
            id="mc"
            x={23.253}
            y={23.253}
            width={977.493}
            height={977.493}
            style={{
              fill: 'white',
              fillOpacity: 0,
            }}
          />
          <g id="mc1">
            <g id="m" transform="matrix(1.0737,0,0,1.0737,-52.8809,-14.2511)">
              <path
                d="M526.104,71.246L526.104,573.46"
                style={{
                  fill: 'none',
                  stroke: 'black',
                  strokeWidth: '27.94px',
                }}
              />
            </g>
          </g>
          <rect
            id="mc2"
            x={23.253}
            y={23.253}
            width={977.493}
            height={977.493}
            style={{
              fill: 'none',
              stroke: 'rgb(255,1,0)',
              strokeOpacity: 0,
              strokeWidth: 5,
            }}
          />
        </g>
        <g id="hours" style={{ transform: `rotateZ(${hoursDeg}deg)`, transformOrigin: 'center' }}>
          <rect
            id="nc"
            x={23.253}
            y={23.253}
            width={977.493}
            height={977.493}
            style={{
              fill: 'none',
              fillOpacity: 0,
            }}
          />
          <g id="nc1">
            <g id="h" transform="matrix(1.0737,0,0,0.652169,-52.8809,227.483)">
              <path
                d="M526.104,71.246L526.104,573.46"
                style={{
                  fill: 'none',
                  stroke: 'black',
                  strokeWidth: '27.94px',
                }}
              />
            </g>
          </g>
          <rect
            id="nc2"
            x={23.253}
            y={23.253}
            width={977.493}
            height={977.493}
            style={{
              fill: 'none',
              stroke: 'rgb(255,1,0)',
              strokeOpacity: 0,
              strokeWidth: 5,
            }}
          />
        </g>
        <g id="seconds" style={{ transform: `rotateZ(${secondsDeg}deg)`, transformOrigin: 'center' }}>
          <rect
            id="secc"
            x={23.253}
            y={23.253}
            width={977.493}
            height={977.493}
            style={{
              fill: 'white',
              fillOpacity: 0,
            }}
          />
          <g id="secc1">
            <g id="sec" transform="matrix(1.0737,0,0,1.0737,-52.8809,-14.2511)">
              <path
                d="M526.104,71.246L526.104,573.46"
                style={{
                  fill: 'none',
                  stroke: 'rgb(255,1,0)',
                  strokeWidth: '4.66px',
                }}
              />
            </g>
          </g>
          <rect
            id="secc2"
            x={23.253}
            y={23.253}
            width={977.493}
            height={977.493}
            style={{
              fill: 'none',
              stroke: 'rgb(255,1,0)',
              strokeOpacity: 0,
              strokeWidth: 5,
            }}
          />
        </g>
      </svg>
      <DateView>{format(time, config.dateFormat)}</DateView>
    </Clock>
  )
}

const Clock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DateView = styled.div`
  font-size: 1rem;
  white-space: nowrap;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);
`

export default memo(SVGClock)
