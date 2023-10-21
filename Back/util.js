export default class Util {
    static filterInput(input) {
        return input
            .replaceAll('"', '')
            .replaceAll("'", "")
            .replaceAll('<', '&#60;')
            .replaceAll('>', '&#62;');
    }
}