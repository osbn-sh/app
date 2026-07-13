export const EntityLinkMapper = (a: string): string => {
    switch (a) {
        case "university":
            return "universities"
        case "major":
            return "majors"
        case "lesson":
            return "lessons"
        case "professor":
            return "professors"
        default:
            return "professors"

    }
}