import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const weeklyAvailabilityMap = DAYS.map((day, index) => {
    const existing = profileData?.weeklyAvailability?.find(
      (a) => a.dayOfWeek === index
    );

    return {
      day,
      dayOfWeek: index,
      id: existing?.id || null,
      startTime: existing?.startTime || "",
      endTime: existing?.endTime || "",
      isEnabled: existing?.isEnabled ?? false
    };
  });

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        weeklyAvailability: profileData.weeklyAvailability,
      };

      console.log("Updated Data: ", updateData);

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { Authorization: `Bearer ${dToken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [dToken]);

  console.log(profileData);

  return (
    profileData && (
      <div>
        <div className="flex gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 max-h-45 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* ------- Doc Info: name, degree, experience ------- */}

            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* ------- Doc About ------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                    className="p-2"
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            {/* <div className="flex gap-1 pt-2">
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Weekly Availability
                </h3>

                <div className="space-y-3">
                  {weeklyAvailabilityMap.map((slot) => (
                    <div
                      key={slot.dayOfWeek}
                      className="flex items-center gap-4 border rounded-lg px-4 py-2"
                    >

                      <div className="w-24 font-medium text-gray-700">
                        {slot.day}
                      </div>

                      <input
                        type="checkbox"
                        disabled={!isEdit}
                        checked={slot.isEnabled}
                        onChange={() =>
                          setProfileData((prev) => ({
                            ...prev,
                            weeklyAvailability: prev.weeklyAvailability.map(
                              (a) =>
                                a.dayOfWeek === slot.dayOfWeek
                                  ? { ...a, isEnabled: !a.isEnabled }
                                  : a
                            ),
                          }))
                        }
                      />

                         <div className="flex items-center gap-2">
                        <input
                          type="time"
                          disabled={!isEdit || !slot.isEnabled}
                          value={slot.startTime}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              weeklyAvailability: prev.weeklyAvailability.map(
                                (a) =>
                                  a.dayOfWeek === slot.dayOfWeek
                                    ? { ...a, startTime: e.target.value }
                                    : a
                              ),
                            }))
                          }
                          className="border px-2 py-1 rounded"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          disabled={!isEdit || !slot.isEnabled}
                          value={slot.endTime}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              weeklyAvailability: prev.weeklyAvailability.map(
                                (a) =>
                                  a.dayOfWeek === slot.dayOfWeek
                                    ? { ...a, endTime: e.target.value }
                                    : a
                              ),
                            }))
                          }
                          className="border px-2 py-1 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

            <div className="self-end">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
