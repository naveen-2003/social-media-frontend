import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiFetch } from "../utils/apiFetch";
import { useAlert } from "./AlertContext";

const ManageAccount = () => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  const mode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    const response = await apiFetch(`/users/${user?.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return showAlert("Failed to delete account", "error");
    }
    showAlert("Account deleted successfully", "success");
    navigate("/logout");
  };
  return (
    <div className="w-full px-5">
      <div className="text-neutral-dark">Want to delete the account?</div>
      <div
        className={`${
          mode === "light" ? "text-red-600" : "text-yellow-300"
        } text-sm font-light border-l-8 border-neutral-main  px-2 rounded-l-md`}
      >
        Note: This action cannot be undone. Once the account is deleted, it
        cannot be retrieved again.
      </div>
      <div className="mt-3 text-end flex justify-end gap-5">
        <button
          onClick={() => {
            setDeleteAccount(!deleteAccount);
          }}
          className={`${
            deleteAccount ? "bg-green-700" : "bg-red-700"
          } text-white px-3 py-2 rounded-lg`}
        >
          {deleteAccount ? "Cancel" : "Delete Account"}
        </button>
        {deleteAccount && (
          <button
            onClick={handleDeleteAccount}
            className="bg-red-700 text-white px-3 py-2 rounded-lg"
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
