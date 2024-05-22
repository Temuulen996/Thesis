import UserContext from "@/context/user_context";
import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const feedBackSentences = [
  "Бид юуг зөв хийж байгаагаа сонсохдоо таатай байна.",
  "Хэрвээ бид ямар нэг зүйлийг буруу хийгээд байгаа бол энэ талаараа мэдэхийг хүсэж байна.",
  "Таны санал бүхэн бидний хувьд үнэ цэнэтэй тул сайжруулах саналаа бидэнтэй хуваалцаач.",
];
const categories = ["Аппликэйшн", "Вебсайт", "Хувцас", "Захиалга", "Хүргэлт"];

const FeedBackCategory = ({ label, onClick, selected }) => {
  return (
    <div
      className={`${
        selected && "bg-slate-700  text-white"
      } w-full py-2 px-2 border-[0.5px] border-slate-700 rounded-lg text-center hover:bg-slate-700 hover:text-white cursor-pointer duration-150`}
      onClick={() => {
        onClick();
      }}
    >
      {" "}
      {label}
    </div>
  );
};
const ContactModal = ({ handleClose, open }) => {
  const [feedBackType, setFeedBackType] = useState(0);
  const [feedback, setFeedback] = useState({
    type: 0,
    category: null,
    feedback: null,
    email: null,
  });
  const usCtx = useContext(UserContext);
  const handleSubmit = async (e) => {
    if (!feedback.category) {
      toast("Төрөл сонгоно уу.", {
        icon: "!",
        style: {
          borderRadius: "10px",
          background: "#f5aa42",
          color: "#fff",
        },
      });
      return;
    }
    toast.promise(usCtx.giveFeedback(feedback), {
      loading: "Хадгалж байна.",
      success: "Амжилттай боллоо.",
      error: "Амжилтгүй боллоо.",
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mx-auto w-full  ">
            <div className="flex flex-col justify-between  md:items-center   p-6">
              <div className="text-white bg-slate-800 py-5 text-2xl font-semibold  w-full flex justify-center ">
                САНАЛ ХҮСЭЛТ
              </div>
              <div>
                <ButtonGroup variant="text" aria-label="feedback">
                  <Button
                    onClick={() => {
                      setFeedback((prev) => {
                        return {
                          ...prev,
                          type: 0,
                        };
                      });
                    }}
                  >
                    Надад таалагдаж байна
                  </Button>
                  <Button
                    onClick={() => {
                      setFeedback((prev) => {
                        return {
                          ...prev,
                          type: 1,
                        };
                      });
                    }}
                  >
                    Таалагдахгүй байна
                  </Button>
                  <Button
                    onClick={() => {
                      setFeedback((prev) => {
                        return {
                          ...prev,
                          type: 2,
                        };
                      });
                    }}
                  >
                    Надад санал хүсэлт байна
                  </Button>
                </ButtonGroup>
              </div>
              <div className="w-full flex justify-around gap-2 mt-2">
                {categories?.map?.((elem, i) => {
                  return (
                    <FeedBackCategory
                      label={elem}
                      key={elem}
                      selected={elem === feedback.category}
                      onClick={() => {
                        setFeedback((prev) => {
                          return { ...prev, category: elem };
                        });
                        console.log(feedback);
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-4 w-full flex justify-center flex-col items-center">
                <p className="text-md mb-4 text-justify">
                  {feedBackSentences[feedback.type]}
                </p>
                <div className="space-y-4 w-full">
                  <input
                    required
                    type="email"
                    placeholder="Email хаягаа оруулна уу.."
                    className="w-full px-4 py-2 border rounded-lg"
                    onChange={(e) => {
                      setFeedback((prev) => {
                        return {
                          ...prev,
                          email: e.target.value,
                        };
                      });
                    }}
                  />

                  <textarea
                    required
                    onChange={(e) => {
                      setFeedback((prev) => {
                        return {
                          ...prev,
                          feedback: e.target.value,
                        };
                      });
                    }}
                    placeholder="Мэдээллээ оруулна уу?"
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="4"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg"
                  >
                    Илгээх
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ContactModal;
