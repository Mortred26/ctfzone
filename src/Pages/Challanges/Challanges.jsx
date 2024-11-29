import React, { useEffect, useState, useRef } from "react";
import { Container } from "../../Components/Container/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";
import MatrixRainEffect from "../banner/banner";

const Modal = ({
  selectedTest,
  onClose,
  onSubmit,
  showHint,
  toggleHint,
  answer,
  setAnswer,
  responseMessage,
  loading,
  completedTestIds,
}) => {
  const modalRef = useRef(null);

  const inputClassName = responseMessage.includes("Incorrect answer")
    ? "input-error"
    : "";
  const isTestCompleted = completedTestIds.includes(selectedTest._id);
  // console.log(selectedTest);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-contents" ref={modalRef}>
        <h3>{selectedTest.name}</h3>
        <p className="modalftext">Question: {selectedTest.question}</p>
        <p className="modalstext">Login Details: {selectedTest.logindetail}</p>

        <form onSubmit={onSubmit}>
          {/* Test tugallangan bo'lsa inputni faqat o'qish uchun qilish */}
          {!isTestCompleted ? (
            <input
              type="text"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className={inputClassName}
            />
          ) : (
            <input
              type="text"
              value={answer}
              readOnly
              className="input-readonly"
            />
          )}

          <div className="sumbit-main">
            {responseMessage && (
              <p
                className={`response-message ${
                  responseMessage.includes("to'g'ri") ? "correct" : "incorrect"
                }`}
              >
                {responseMessage}
              </p>
            )}

            <div className="challenge-main">
              {loading ? (
                <div className="loader-challenge"></div>
              ) : (
                <button
                  type="submit"
                  className="challenge-button"
                  disabled={loading || isTestCompleted} // Disable submit if test is completed
                >
                  submit
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="exit-main">
          <div className="hint-container">
            <button onClick={toggleHint} className="hint-button">
              !
            </button>
            {showHint && (
              <div className="hint-content">
                <p className="hint">
                  <strong>Hint:</strong> {selectedTest.hint}
                </p>
              </div>
            )}
          </div>
          <button onClick={onClose} className="exit-button">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export const Challanges = () => {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [completedTestIds, setCompletedTestIds] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(id);
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    console.log(`User Email: ${userEmail}`);

    axios
      .get(
        `https://ctfhawksbackend.onrender.com/api/categories/user-tests/${userEmail}/${id}`
      )
      .then((response) => {
        setCategoryData(response.data.groups);
        setCompletedTestIds(response.data.completedTestIds);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", error);
      });
  }, [id]);

  const openModal = (test) => {
    // Test tugallangan bo'lsa, modalni faqat ko'rish uchun ochamiz
    if (completedTestIds.includes(test._id)) {
      console.log("Test allaqachon bajarilgan:", test._id);
      setSelectedTest(test);
      setIsModalOpen(true); // Modalni faqat ko'rish uchun ochamiz
      setAnswer(test.answer || ""); // Agar oldingi javob mavjud bo'lsa, uni ko'rsatamiz
    } else {
      setSelectedTest(test);
      setIsModalOpen(true);
      setResponseMessage("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTest(null);
    setShowHint(false);
    setAnswer("");
  };

  const toggleHint = () => setShowHint((prev) => !prev);

  const handleSubmit = (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    const userEmail = localStorage.getItem("email");
    console.log(`Selected Test ID: ${selectedTest._id}`);
    setLoading(true);
    axios
      .post(
        `https://ctfhawksbackend.onrender.com/api/tests/${selectedTest._id}/submit`,
        { answer: answer.trim(), userEmail },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Ensure token is correctly set
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.correct) {
          setCompletedTestIds((prev) => [...prev, selectedTest._id]);
          setResponseMessage("Javob to'g'ri. Test muvaffaqiyatli yakunlandi.");
          setAnswer(""); // Reset answer
          setIsModalOpen(false); // Close the modal if correct
        } else {
          setResponseMessage("Noto'g'ri javob. Iltimos, qayta urinib ko'ring.");
          // Javobni o'chirmaymiz
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Javobni yuborishda xatolik:", error);
        if (error.response && error.response.data) {
          setResponseMessage(error.response.data);
        } else {
          setResponseMessage("Javobni yuborishda xatolik yuz berdi.");
        }
        // Javobni o'chirmaymiz
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <>
      <section className="challanges">
        <MatrixRainEffect />
        <Container>
          <h2 className="chellenge-group">Ctf Challenge</h2>
          <ul className="challanges-ul">
            {categoryData && categoryData.length > 0 ? (
              categoryData.map((group) => (
                <li key={group._id} className="challanges-box2">
                  <h3>{group.name}</h3>
                  <ul className="challanges-ul">
                    {group.tests.map((test) => (
                      <li
                        key={test._id}
                        className={`challanges-box ${
                          completedTestIds.includes(test._id)
                            ? "green-background"
                            : ""
                        }`}
                        onClick={() => openModal(test)}
                        style={{
                          cursor: completedTestIds.includes(test._id)
                            ? "default"
                            : "pointer",
                          backgroundColor: completedTestIds.includes(test._id)
                            ? "#59ec59"
                            : "",
                        }}
                      >
                        <h2 className="challanges-title">{test.name}</h2>
                        <span className="challanges-text">{test.score}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <p className="challenge-report">
                No groups with available tests in this category.
              </p>
            )}
          </ul>

          {isModalOpen && selectedTest && (
            <Modal
              selectedTest={selectedTest}
              onClose={closeModal}
              onSubmit={handleSubmit}
              showHint={showHint}
              toggleHint={toggleHint}
              answer={answer}
              setAnswer={setAnswer}
              responseMessage={responseMessage}
              loading={loading}
              completedTestIds={completedTestIds}
            />
          )}
        </Container>
      </section>
    </>
  );
};
