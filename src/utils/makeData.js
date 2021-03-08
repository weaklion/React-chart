import PersonData from "../cohortData/person.json";
import VisitData  from "../cohortData/visit_occurrence.json";
import ConditionData from "../cohortData/condition_occurrence.json";
import DeathData from "../cohortData/death.json";

export const newPerson = () => {
  const today = new Date();
  return PersonData.person.map((d) => {
    return {
      person_id   : d.person_id,
      gender      : d.gender_source_value,
      birth       : d.birth_datetime,
      age         : today.getFullYear() - d.year_of_birth,
      race_source : d.race_source_value,
      ethnicity   : d.ethnicity_source_value,
      death_date  : DeathData.death.find(
        death => death.person_id === d.person_id) ? 'O' : 'X',
      subRows : [
        {
          visitTotal  : VisitData.visit_occurrence.filter(
            visit => visit.person_id === d.person_id
          ).length,
          condition : ConditionData.condition_occurrence.find(
            condition => condition.person_id === d.person_id
          )
        }
      ]
    }
  })
};

export const groupBy = (key) => {
  const personGroup = newPerson().reduce((acc, cur) => {
     let group = cur[key];

     if(acc[group] === undefined) {
        acc[group] = [];
     }

     acc[group].push(cur);

     return acc;
  }, {});
  return {
    label : Object.keys(personGroup),
    data  : Object.values(personGroup)
  }
}


