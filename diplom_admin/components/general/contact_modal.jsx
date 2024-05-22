import { Box, Modal } from "@mui/material";
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

const ContactModal = ({ handleClose, open }) => {
  const handleSubmit = (e) => {

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
          <div className=" mx-auto w-full my-6 mb-28">
            <div className="flex flex-col md:flex-row md:items-center   p-6">
              <div className="  mt-4   flex justify-center flex-col items-center">
                <p className="font-bold text-xl mb-4">
                  Хэлэх зүйлээ үлдээнэ үү..
                </p>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Нэрээ оруулна уу.."
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Email хаягаа оруулна уу.."
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Ямар шалтгаанаар бидэнтэй хандаж байгаа вэ?"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <textarea
                    placeholder="Мэдээллээ оруулна уу?"
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="4"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
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
