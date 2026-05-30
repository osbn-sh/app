"use client"

import * as React from "react"

import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"
import { Field, FieldLabel } from "@/components/ui/field"

const categories = [
    "technology",
    "design",
    "business",
    "marketing",
    "education",
    "health",
] as const

const categoryLabels: Record<string, string> = {
    technology: "فناوری",
    design: "طراحی",
    business: "کسب‌وکار",
    marketing: "بازاریابی",
    education: "آموزش",
    health: "سلامت",
}

const t = {
    label: "دسته‌بندی‌ها",
    placeholder: "جستجو...",
    empty: "نتیجه‌ای یافت نشد",
}

export default function ComboboxRtl() {
    const anchor = useComboboxAnchor()

    return (
        <Field className="mx-auto w-full max-w-xs">
            <FieldLabel>{t.label}</FieldLabel>
            <Combobox
                multiple
                autoHighlight
                items={categories}
                defaultValue={[categories[0]]}
                itemToStringValue={(item: (typeof categories)[number]) =>
                    categoryLabels[item] || item
                }
            >
                <ComboboxChips ref={anchor}>
                    <ComboboxValue>
                        {(values: string[]) => (
                            <React.Fragment>
                                {values.map((value) => (
                                    <ComboboxChip key={value}>
                                        {categoryLabels[value] || value}
                                    </ComboboxChip>
                                ))}
                                <ComboboxChipsInput placeholder={t.placeholder} />
                            </React.Fragment>
                        )}
                    </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={anchor} dir="rtl" data-lang="fa">
                    <ComboboxEmpty>{t.empty}</ComboboxEmpty>
                    <ComboboxList>
                        {(item: (typeof categories)[number]) => (
                            <ComboboxItem key={item} value={item}>
                                {categoryLabels[item] || item}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </Field>
    )
}