import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faRightToBracket,
    faUser,
    faBicycle,
    faMotorcycle,
    faChartLine,
    faHouse,
    faComment
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
    return library.add(
        faRightToBracket,
        faUser,
        faBicycle,
        faMotorcycle,
        faChartLine,
        faHouse,
        faComment
    );
};

export default Icons;