import { Fragment, useMemo } from "react";
import Table from "./components/cohortTable";
import { Doughnut } from "react-chartjs-2";
import { newPerson, groupBy }from "./utils/makeData";
import { SelectColumnFilter, SlidercolumnFilter} from "./utils/filter";

import './App.css';


function App() {

  const columns = useMemo (
    () => [
      {
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
 
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '▼' : '►'}
          </span>
        ),
      },
      {
        accessor : "person_id",
        Header   : "환자 id",
        Filter   : "",
      },
      {
        accessor : "gender",
        Header   : "성별",
        Filter   : SelectColumnFilter,
        filters  : 'equals'
      },
      {
        accessor : "birth",
        Header   : "생년월일",
        Filter   : "",
      },
      {
        accessor : "age",
        Header   : "나이",
        Filter   : SlidercolumnFilter,
        filters  : 'equals'
      },
      {
        accessor : "race_source",
        Header   : "인종"
      },
      {
        accessor : "ethnicity",
        Header   : "민족"
      },
      {
        accessor : "death_date",
        Header   : "사망 여부"
      },
    ],
    []
  );

  const genderData = () => {
    const gender = groupBy("gender");
    return {
      labels : ["남자","여자"],
      datasets :[
        {
          labels : gender.label,
          data : gender.data.map((x) => {
            return x.length;
          }),
          borderWidth : 2,
          hoverBorderWidth : 3,
          backgroundColor: [
            "rgba(238, 102, 121, 1)",
            "rgba(98, 181, 229, 1)",
            "rgba(255, 198, 0, 1)"
          ],
          fill: true
        }
      ]
    }
  };
  
  const raceData= () => {
    const race = groupBy("race_source");
    return {
      labels : race.label,
      datasets :[
        {
          labels : race.label,
          data : race.data.map((x) => {
            return x.length;
          }),
          borderWidth : 2,
          hoverBorderWidth : 3,
          backgroundColor: [
            "rgba(128, 152, 121, 1)",
            "rgba(98, 193, 229, 1)",
            "rgba(255, 198, 0, 1)",
            "rgba(195, 112, 35, 8)",
            "rgba(124, 155, 3, 5)",
           
          ],
          fill: true
        }
      ]
    }
  }

  const ethnicityData = () => {
    const ethnicity = groupBy("ethnicity");
    return {
      labels : ethnicity.label,
      datasets :[
        {
          labels : ethnicity.label,
          data : ethnicity.data.map((x) => {
            return x.length;
          }),
          borderWidth : 2,
          hoverBorderWidth : 3,
          backgroundColor: [
            "rgba(126, 13, 86, 1)",
            "rgba(31, 121, 155, 29)",
         
          ],
          fill: true
        }
      ]
    }
  }

  const data = useMemo(() => newPerson(), []);

  const renderSubComponent = ( original ) => {
    console.log(original);
    return (
      original.subRows &&
      original.subRows.map((i, key) => (
        <Fragment key={key}>
          <div> 전체 방문 수 : {i.visitTotal}</div>
          <div> 진단 정보    : {i.condition.condition_concept_id}</div>
        </Fragment>
      ))
    );
  };
  

  return (
    <div className="App">
      <div className="chart">
        <Doughnut 
          options={{
            legend : {
              display : true,
              position : "right"
            }
          }}
          data={genderData}
          width={90}
          height={90}
        />

        <Doughnut 
          options={{
            legend : {
              display : true,
              position : "right"
            }
          }}
          data={raceData}
          width={90}
          height={90}
        />

        <Doughnut 
          options={{
            legend : {
              display : true,
              position : "right"
            }
          }}
          data={ethnicityData}
          width={90}
          height={90}
        />

    
    </div>
    <Table
      columns={columns} 
      data={data} 
      renderRowSubComponent={renderSubComponent}
    />
    </div>
  );
}

export default App;
