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

export const EntityLinkMapperReverse = (a: string): string => {
    switch (a) {
        case "universities":
            return "university"
        case "majors":
            return "major"
        case "lessons":
            return "lesson"
        case "professors":
            return "professor"
        default:
            return "professors"

    }
}