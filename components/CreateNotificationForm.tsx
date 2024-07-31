import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNotifications } from "../context/NotificationContext";

const schema = z.object({
  type: z.enum([
    "Platform update",
    "Comment Tag",
    "Access granted",
    "Join workspace",
  ]),
  message: z.string().min(1, "Message is required"),
  userId: z.string().min(1, "User ID is required"),
  userName: z.string().optional(),
  releaseNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type CreateNotificationFormProps = {
  onClose: () => void;
};

export default function CreateNotificationForm({
  onClose,
}: CreateNotificationFormProps) {
  const { addNotification } = useNotifications();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedType = watch("type");

  const onSubmit = (data: FormData) => {
    addNotification(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="type" className="block mb-1 font-medium">
          Notification Type
        </label>
        <select
          id="type"
          {...register("type")}
          className="w-full p-2 border rounded text-black focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a type</option>
          <option value="Platform update">Platform update</option>
          <option value="Comment Tag">Comment Tag</option>
          <option value="Access granted">Access granted</option>
          <option value="Join workspace">Join workspace</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Message
        </label>
        <input
          id="message"
          type="text"
          {...register("message")}
          className="w-full p-2 border rounded text-black focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter notification message"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="userId" className="block mb-1 font-medium">
          User ID
        </label>
        <input
          id="userId"
          type="text"
          {...register("userId")}
          className="w-full p-2 border rounded text-black focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter user ID"
        />
        {errors.userId && (
          <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>
        )}
      </div>

      {selectedType !== "Platform update" && (
        <div>
          <label htmlFor="userName" className="block mb-1 font-medium">
            User Name
          </label>
          <input
            id="userName"
            type="text"
            {...register("userName")}
            className="w-full p-2 border rounded text-black focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter user name"
          />
        </div>
      )}

      {selectedType === "Platform update" && (
        <div>
          <label htmlFor="releaseNumber" className="block mb-1 font-medium">
            Release Number
          </label>
          <input
            id="releaseNumber"
            type="text"
            {...register("releaseNumber")}
            className="w-full p-2 border rounded text-black focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter release number"
          />
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create
        </button>
      </div>
    </form>
  );
}
