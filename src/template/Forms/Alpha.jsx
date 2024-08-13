import React, { useState } from "react";
import {
  TextInput,
  Textarea,
  Dropdown,
  Checkbox,
  Button,
  Label,
} from "flowbite-react";
import axios from "axios";
import Select from "react-select";
import { itemTypeTags } from "../Utils";
import { useNavigate } from "react-router-dom";

const AlphaForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [purpose, setPurpose] = useState("");
  const [contentType, setContentType] = useState("");
  const [numPublications, setNumPublications] = useState("");
  const [experience, setExperience] = useState("");
  const [interestedReason, setInterestedReason] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [comments, setComments] = useState("");
  const [agreement, setAgreement] = useState(false);
  const navigate = useNavigate();


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const data = {
      databaseId: "7a8927ce-09ed-4f82-93fd-44d22aca3ea1",
      title: "grants",
      contentMarkdown: "Markdown title content",
      properties: {},
    };

    // Update the data object with form values
    data.properties.fullName = fullName;
    data.properties.email = email;
    data.properties.phone = contactNumber;
    data.properties.jobTitle = jobTitle;
    data.properties.company = company;
    data.properties.industry = industry;
    data.properties.purpose = purpose;
    data.properties.contentType = contentType;
    data.properties.numPublications = numPublications;
    data.properties.experience = experience;
    data.properties.interestedReason = interestedReason;
    data.properties.hearAboutUs = hearAboutUs;
    data.properties.comments = comments;
    data.properties.agreement = agreement.toString();

    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_BACKEND_API_URL + "/postdb",
        data
      );
      navigate("/"); // Redirect to home page after successful form submission
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      alert("Failed to submit form. Please try again later.");
      console.error(error); // Handle the error as needed
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col w-1/2 min-w-600px mx-auto"
    >
      <div>
        <h2 className="text-center font-bold text-lg p-5">
          Alpha Access Request Form
        </h2>
      </div>
      <div className="rounded border m-5">
        <div className="w-full p-6">
          <Label htmlFor="fullName">Full Name</Label>
          <TextInput
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="w-full p-6">
          <Label htmlFor="email">Email Address</Label>
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full p-6">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <TextInput
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded border m-5 p-4">
        <div className="w-full p-6">
          <Label htmlFor="purpose">Purpose of Using the App</Label>
          <Textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
        <div className="w-full p-6">
          <Label htmlFor="contentType">Type of Content to be Published</Label>
          <Dropdown
            label="Pick your content type"
            placement="right-start"
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <Dropdown.Item onClick={()=>setContentType("1-5")}>eBooks</Dropdown.Item>
            <Dropdown.Item>Articles</Dropdown.Item>
            <Dropdown.Item>Journals</Dropdown.Item>
            <Dropdown.Item>Reports</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="w-full p-6">
          <Label htmlFor="numPublications">
            Estimated Number of Publications per Year
          </Label>
          <Dropdown
            placement="right-start"
            id="numPublications"
            value={numPublications}
            onChange={(e) => {
              console.log(e);
              setNumPublications(e.target.value);
            }}
          >
            <Dropdown.Item onClick={()=>setNumPublications("1-5")}>1-5</Dropdown.Item>
            <Dropdown.Item onClick={()=>setNumPublications("Social Media")}>6-10</Dropdown.Item>
            <Dropdown.Item onClick={()=>setNumPublications("11-20")}>11-20</Dropdown.Item>
            <Dropdown.Item onClick={()=>setNumPublications("20+")}>20+</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <div className="rounded border m-5 p-4">
        <div className="w-full p-6">
          <Label htmlFor="experience">Experience with Similar Apps</Label>
          <Dropdown
            label="Pick one"
            placement="right-start"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <Dropdown.Item onClick={() => setExperience("None")}>
              None
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExperience("Beginner")}>
              Beginner
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExperience("Intermediate")}>Intermediate</Dropdown.Item>
            <Dropdown.Item onClick={() => setExperience("Advanced")}>Advanced</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <div className="rounded border m-5 p-4">
        <div className="w-full p-6">
          <Label htmlFor="interestedReason">
            Why Are You Interested in Our App?
          </Label>
          <Textarea
            id="interestedReason"
            value={interestedReason}
            onChange={(e) => setInterestedReason(e.target.value)}
          />
        </div>
        <div className="w-full p-6">
          <Label htmlFor="hearAboutUs">How Did You Hear About Us?</Label>
          <Dropdown
            placement="right-start"
            id="hearAboutUs"
            value={hearAboutUs}
            onChange={(e) => setHearAboutUs(e.target.value)}
          >
            <Dropdown.Item onClick={()=>setHearAboutUs("Social Media")}>Social Media</Dropdown.Item>
            <Dropdown.Item onClick={()=>setHearAboutUs("Word of Mouth")}>Word of Mouth</Dropdown.Item>
            <Dropdown.Item onClick={()=>setHearAboutUs("Advertisement")}>Advertisement</Dropdown.Item>
            <Dropdown.Item onClick={()=>setHearAboutUs("Other")}>Other</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="w-full p-6">
          <Label htmlFor="comments">Comments or Questions</Label>
          <Textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded border m-5 p-4">
        <div className="w-full p-6">
          <Checkbox
            id="agreement"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
          />{" "}          <Label htmlFor="agreement">
          I agree to the terms and conditions of the alpha program.
        </Label>
        </div>
      </div>

      <Button className="m-20" type="submit">
        Request Access
      </Button>
    </form>
  );
};

export default AlphaForm;
