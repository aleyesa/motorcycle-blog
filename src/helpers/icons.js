import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faDoorClosed,
    faDoorOpen,
    faGear,
    faRightToBracket,
    faUser,
    faPersonWalking,
    faBicycle,
    faMotorcycle,
    faChartLine,
    faHouse,
    faComment
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
    return library.add(
        faDoorClosed,
        faDoorOpen,
        faGear,
        faRightToBracket,
        faUser,
        faPersonWalking,
        faBicycle,
        faMotorcycle,
        faChartLine,
        faHouse,
        faComment
    );
};

export default Icons;