import { Levels, ProfNames } from "@utility/JSON"
import type { experienceType, professionsType } from "types/displayDataTypes"

export const GetProfessionData = (
    xp: number[],
    selectedProfessions?: number[]
) : experienceType[] => {
    const SKILLS = ["Farming", "Fishing", "Foraging", "Mining", "Combat"]
    let skillLevelData: experienceType[] = [] 
    xp.forEach((_skill, id) => {
        if (SKILLS[id] !== undefined){
            let level = Levels.find((level) => level.val >= _skill) || { id: 10, val: 15000 }
            skillLevelData.push({
                skill:  SKILLS[id] || "Unknown",
                xp: _skill,
                levelInfo: level,
                selectedProfession: 
                    SetSelectedProfession(SKILLS[id], selectedProfessions)
            })
        }
    })
    return skillLevelData
}

const SetSelectedProfession = (profession: string, selectedProfessions?: number[]): professionsType[] => {
    if (!selectedProfessions || selectedProfessions.length === 0) {
        return [];
    }
    const byType = ProfNames.professions.filter(p => p.type === profession);
    const selectedIds = new Set(selectedProfessions);
    const result = byType.filter(p => selectedIds.has(p.id));
    return result as professionsType[];
}
