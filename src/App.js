import React, { useState, useEffect } from "react";
import Data from "./data_handling/newDataset.csv";
import "./App.css";
import Papa from "papaparse";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl, InputLabel } from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [documentTitleFilter, setDocumentTitleFilter] = useState("");
  const [questionTextFilter, setQuestionTextFilter] = useState("");
  const [shortAnswer1Filter, setShortAnswer1Filter] = useState("");
  const [shortAnswer2Filter, setShortAnswer2Filter] = useState("");
  const [shortAnswer3Filter, setShortAnswer3Filter] = useState("");
  const [shortAnswer4Filter, setShortAnswer4Filter] = useState("");
  const [shortAnswer5Filter, setShortAnswer5Filter] = useState("");
  const [shortAnswer6Filter, setShortAnswer6Filter] = useState("");
  const [shortAnswer7Filter, setShortAnswer7Filter] = useState("");
  const [shortAnswer8Filter, setShortAnswer8Filter] = useState("");
  const [yesNoFilter, setYesNoFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      });

      if (parsedData.data.length > 0) {
        setData(parsedData.data);
        setHeaders(Object.keys(parsedData.data[0]));
      } else {
        console.error("Error parsing CSV file.");
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(
    (row) =>
      row.document_title
        .toLowerCase()
        .includes(documentTitleFilter.toLowerCase()) &&
      row.yes_no_answer.toLowerCase().includes(yesNoFilter.toLowerCase()) &&
      row.question_text
        .toLowerCase()
        .includes(questionTextFilter.toLowerCase()) &&
      row.short_answer1
        .toLowerCase()
        .includes(shortAnswer1Filter.toLowerCase()) &&
      row.short_answer2
        .toLowerCase()
        .includes(shortAnswer2Filter.toLowerCase()) &&
      row.short_answer3
        .toLowerCase()
        .includes(shortAnswer3Filter.toLowerCase()) &&
      row.short_answer4
        .toLowerCase()
        .includes(shortAnswer4Filter.toLowerCase()) &&
      row.short_answer5
        .toLowerCase()
        .includes(shortAnswer5Filter.toLowerCase()) &&
      row.short_answer6
        .toLowerCase()
        .includes(shortAnswer6Filter.toLowerCase()) &&
      row.short_answer7
        .toLowerCase()
        .includes(shortAnswer7Filter.toLowerCase()) &&
      row.short_answer8.toLowerCase().includes(shortAnswer8Filter.toLowerCase())
  );


  return (
    <div className="App">
      <header className="App-header">
        <div className="filter-container1" style={{ marginBottom: "100px" }}>
          <h2 style={{ marginBottom: "10px" }}>Filter by</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "50px",
            }}
          >
            <div className="filter-container">
              <TextField
                id="documentTitle"
                label="Document Title"
                variant="outlined"
                value={documentTitleFilter}
                onChange={(e) => setDocumentTitleFilter(e.target.value)}
                style={{ backgroundColor: "white", width: "300px" }}
              />
            </div>

            <div className="filter-container">
              <TextField
                id="questionText"
                label="Question Text"
                variant="outlined"
                value={questionTextFilter}
                onChange={(e) => setQuestionTextFilter(e.target.value)}
                style={{ backgroundColor: "white", width: "300px" }}
              />
            </div>

            <div className="filter-container">
              <FormControl variant="outlined" style={{ minWidth: "200px" }}>
                <InputLabel id="yes-no-answer-label">Yes No Answer</InputLabel>
                <Select
                  id="yes_no_answer"
                  label="Yes No Answer"
                  variant="outlined"
                  value={yesNoFilter}
                  onChange={(e) => setYesNoFilter(e.target.value)}
                  style={{ backgroundColor: "white", width: "300px" }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="filter-container">
              <TextField
                id="shortAnswer1"
                label="Short Answer 1"
                variant="outlined"
                value={shortAnswer1Filter}
                onChange={(e) => setShortAnswer1Filter(e.target.value)}
                style={{ backgroundColor: "white", width: "300px" }}
              />
            </div>
            <div className="filter-container">
              <TextField
                id="shortAnswer2"
                label="Short Answer 2"
                variant="outlined"
                value={shortAnswer2Filter}
                onChange={(e) => setShortAnswer2Filter(e.target.value)}
                style={{ backgroundColor: "white", width: "300px" }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="filter-container">
              <TextField
                id="shortAnswer3"
                label="Short Answer 3"
                variant="outlined"
                value={shortAnswer3Filter}
                onChange={(e) => setShortAnswer3Filter(e.target.value)}
                style={{ backgroundColor: "white", width: "300px" }}
              />
            </div>
            <div className="filter-container">
              <TextField
                id="shortAnswer4"
                label="Short Answer 4"
                variant="outlined"
                value={shortAnswer4Filter}
                onChange={(e) => setShortAnswer4Filter(e.target.value)}
                style={{ backgroundColor: "white", width: "300px" }}
              />
            </div>
            <div className="filter-container">
              <TextField
                id="shortAnswer5"
                label="Short Answer 5"
                variant="outlined"
                value={shortAnswer5Filter}
                onChange={(e) => setShortAnswer5Filter(e.target.value)}
                style={{ backgroundColor: "white", width: "300px" }}
              />
            </div>

            <div className="filter-container">
              <TextField
                id="shortAnswer6"
                label="Short Answer 6"
                variant="outlined"
                value={shortAnswer6Filter}
                onChange={(e) => setShortAnswer6Filter(e.target.value)}
                style={{ backgroundColor: "white", width: "300px" }}
              />
            </div>

            <div className="filter-container">
              <TextField
                id="shortAnswer7"
                label="Short Answer 7"
                variant="outlined"
                value={shortAnswer7Filter}
                onChange={(e) => setShortAnswer7Filter(e.target.value)}
                style={{ backgroundColor: "white", width: "300px" }}
              />
            </div>
          </div>
        </div>
        {data.length ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      style={{
                        padding: "20px 20px",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "grey",
                        zIndex: 1,
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header, colIndex) => (
                      <td key={colIndex} style={{ padding: "10px 20px" }}>
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default App;
