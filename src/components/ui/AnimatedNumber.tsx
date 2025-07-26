
import { useSpring, animated } from "@react-spring/web";

export const AnimatedNumber = ({ value } :{value:number}) => {
    const props = useSpring({ from: { number: 0 }, to: { number: value }, config: { duration: 2000 } });

    return (
        <animated.div>
            {props.number.to((n) => n.toFixed(0))}
        </animated.div>
    );
};

