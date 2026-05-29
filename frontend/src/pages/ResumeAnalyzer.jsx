import axios from "axios";
import React, {
  useState,
  useEffect
} from "react";

import { motion } from "framer-motion";

import {
  UploadCloud,
  FileText,
  AlertCircle,
  Sparkles
} from "lucide-react";


const ResumeAnalyzer = () => {

  const [file, setFile] = useState(null);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [showResult, setShowResult] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [roles, setRoles] =
    useState([]);

  const [selectedRole,
    setSelectedRole] =
    useState("");


  useEffect(() => {

    fetchRoles();

  }, []);


  const fetchRoles = async () => {

    try {

      const response =
        await axios.get(

          "http://127.0.0.1:8000/api/resume/roles/"
        );

      setRoles(
        response.data.roles
      );

      setSelectedRole(
        response.data.roles[0]
      );

    }

    catch (error) {

      console.log(error);

    }

  };


  const handleDragOver = (e) => {

    e.preventDefault();

  };


  const handleDrop = (e) => {

    e.preventDefault();

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0]
    ) {

      handleFile(
        e.dataTransfer.files[0]
      );
    }
  };


  const handleFileInput = (e) => {

    if (
      e.target.files &&
      e.target.files[0]
    ) {

      handleFile(
        e.target.files[0]
      );

    }

  };


  const handleFile = async (
    selectedFile
  ) => {

    setFile(
      selectedFile
    );

    setIsAnalyzing(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "resume",
        selectedFile
      );

      formData.append(
        "role",
        selectedRole
      );


      const response =
        await axios.post(

          "http://127.0.0.1:8000/api/resume/analyze/",

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }

        );

      setResult(
        response.data
      );

      setShowResult(true);

    }

    catch (error) {

      console.log(error);

      alert(
        "Resume analyze failed"
      );

    }

    finally {

      setIsAnalyzing(false);

    }

  };


  return (

    <div className="max-w-4xl mx-auto space-y-8">

      <div>

        <h1 className="text-2xl font-bold">

          Resume Analyzer

        </h1>

        <p className="text-slate-500">

          Upload resume and analyze ATS score

        </p>


        <select

          value={selectedRole}

          onChange={(e) => {

            setSelectedRole(
              e.target.value
            )

          }}

          className="mt-4 px-4 py-3 border rounded-xl"

        >

          {

            roles.map(

              (role, index) => (

                <option
                  key={index}
                  value={role}
                >

                  {role}

                </option>

              )

            )

          }

        </select>

      </div>


      {!showResult && !isAnalyzing && (

        <motion.div

          onDragOver={
            handleDragOver
          }

          onDrop={
            handleDrop
          }

          className="border-2 border-dashed p-10 rounded-3xl text-center"

        >

          <input

            type="file"

            id="fileUpload"

            className="hidden"

            accept=".pdf,.docx"

            onChange={
              handleFileInput
            }

          />

          <div

            onClick={() => {

              document
                .getElementById(
                  "fileUpload"
                )
                .click()
            }}

          >

            <UploadCloud
              className="w-10 h-10 mx-auto"
            />

            <h3>

              Upload Resume

            </h3>

          </div>

        </motion.div>

      )}



      {isAnalyzing && (

        <div>

          Analyzing Resume...

        </div>

      )}



      {showResult && (

        <div
          className="grid grid-cols-2 gap-6"
        >

          <div
            className="bg-indigo-600 p-8 rounded-3xl text-white"
          >

            <h3>

              ATS Score

            </h3>

            <div
              className="text-5xl font-bold"
            >

              {result?.ats_score}

              /100

            </div>

          </div>


          <div
            className="bg-white p-8 rounded-3xl"
          >

            <h3>

              Extracted Skills

            </h3>

            <div
              className="flex flex-wrap gap-2 mt-4"
            >

              {

                result?.extracted_skills?.map(

                  (skill, index) => (

                    <span

                      key={index}

                      className="px-3 py-2 rounded-xl bg-slate-100"

                    >

                      {skill}

                    </span>

                  )

                )

              }

            </div>


            <h3
              className="mt-6"
            >

              Missing Keywords

            </h3>

            <div
              className="flex flex-wrap gap-2 mt-4"
            >

              {

                result?.missing_keywords?.map(

                  (skill, index) => (

                    <span

                      key={index}

                      className="px-3 py-2 rounded-xl bg-yellow-100"

                    >

                      + {skill}

                    </span>

                  )

                )

              }

            </div>

          </div>

        </div>

      )}

    </div>

  )

}

export default ResumeAnalyzer