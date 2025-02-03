/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext,useState,useEffect } from "react";
import { CiSettings } from "react-icons/ci";
import { NoteContext } from "../layout";
import Settings from "./Settings";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [preview,setPreview] = useState<boolean>(false);
  const [filteredNotes,setFilteredNotes] = useState<any[]>([])
  const { settings, setSettings,notes } = useContext<{
    notes: any[];
    setNotes: React.Dispatch<
      React.SetStateAction<any[]>
    >;
    settings: boolean;
    tags: string[];
    setSettings: React.Dispatch<
      React.SetStateAction<boolean>
    >;
    setTags: React.Dispatch<
      React.SetStateAction<string[]>
    >;
          darkMode: boolean;
          setDarkMode: React.Dispatch<
            React.SetStateAction<boolean>
          >;
  }>(NoteContext);

  const checkSearch = (item: any) => {
    return item.title.toUpperCase().includes(search) || item.tags.some((tag: string) => tag.toUpperCase().includes(search));

  }

  useEffect(()=>{
    setFilteredNotes(notes.filter(checkSearch))
  },[search])


console.log(filteredNotes)
  return (
    <div className={"border border-t-0  w-full relative p-4 px-10 items-center flex justify-between"}>
      <h1 className="font-extrabold">
        All Notes
      </h1>
      <div className="flex items-center gap-1 relative">
        <input
          type="text"
          placeholder="Search notes"
          className="w-[20vw] border-2 p-2 rounded-md focus:outline-none"
          onInput={
            (e) =>{
              setSearch(
                (e.target as HTMLInputElement)
                  .value.toUpperCase()
              )
              setPreview(true)}
          }
          onBlur={
            () => setPreview(false)
          }
        />
        {
          preview && (
            <div className="absolute top-12 left-2 bg-white h-fit p-4 rounded-lg w-60 shadow-[1px_2px_5px_gray]">
              {
                filteredNotes.map(
                  (note: any, index: number) => (
                  <p key={index}>
                    {note.title}
                  </p>

                  ))
              }
            </div>
          )
        }
        <button
          className="hover:bg-sky-200 rounded-full p-1"
          onClick={() => setSettings(!settings)}
        >
          <CiSettings size={30} />
        </button>
      </div>
      {settings && <Settings />}
    </div>
  );
};

export default Header;
