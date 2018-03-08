import { DatePicker } from "material-ui";

(DatePicker as any).prototype.getValue = function() {
    return this.getDate();
}