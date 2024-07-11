type IconProps = React.HTMLAttributes<SVGElement>;
type PropsType = {
  bgFill?: string;
  contentFill?: string;
  props?: IconProps;
};

export const IconsPersonal = {
  overview: ({ bgFill, contentFill, ...props }: PropsType) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='62'
      height='62'
      viewBox='0 0 62 62'
      {...props}
    >
      <circle
        cx='31'
        cy='31'
        r='31'
        fill='#eff0f3'
      />
      <g transform='translate(-830.298 791.058)'>
        <path
          d='M7.757,19.93v6.649H3.324A3.324,3.324,0,0,1,0,23.255V13.147A2.216,2.216,0,0,1,.624,11.6L10.041,1.424A4.433,4.433,0,0,1,16.3,1.177q.128.118.247.247l9.4,10.177a2.216,2.216,0,0,1,.644,1.563V23.255a3.324,3.324,0,0,1-3.324,3.324H18.839V19.93a5.541,5.541,0,1,0-11.082,0'
          transform='translate(848 -773.347)'
          fill='#001942'
        />
        <path
          d='M195.162,319.681a3.162,3.162,0,0,1,3.162,3.162v6.324H192v-6.324a3.162,3.162,0,0,1,3.162-3.162'
          transform='translate(666.135 -1075.936)'
          fill='#001942'
        />
      </g>
    </svg>
  ),
};
