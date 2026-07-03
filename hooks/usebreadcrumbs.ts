import { usePathname } from "next/navigation"


const useBreadcrumbs = (): string[] => {
    const urlAddress = usePathname().split("/")

    const newData = urlAddress.map((value, index) => {
        return translations.find((v) => value.includes(v.target))?.mustBe || ''
    })

    return newData.filter((r) => r != '')
}


export default useBreadcrumbs





const translations = [
    { target: "outlook", mustBe: 'مشاهده' },
    { target: "append", mustBe: 'افزودن' },
    { target: "manipulation", mustBe: 'تغییرات' },
    { target: "universities", mustBe: 'دانشگاه ها' },
    { target: "majors", mustBe: 'رشته ها' },
    { target: "lessons", mustBe: 'دروس' },
    { target: "professors", mustBe: 'اساتید' },

    { target: "universitie", mustBe: 'دانشگاه' },
    { target: "major", mustBe: 'رشته' },
    { target: "lesson", mustBe: 'درس' },
    { target: "professor", mustBe: 'استاد' },


]