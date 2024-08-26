import React, { useEffect, useRef, useState } from "react";
import { Container } from "../../Components/Container/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";

const Modal = ({
  selectedTest,
  onClose,
  onSubmit,
  showHint,
  toggleHint,
  answer,
  setAnswer,
  responseMessage,
}) => {
  const modalRef = useRef(null);

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
      <div className="modal-content" ref={modalRef}>
        <h3>{selectedTest.name}</h3>
        <p>Question: {selectedTest.question}</p>
        <p className="modal-question">
          Login Details: {selectedTest.logindetail}
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <button className="modal-sumbit" type="submit">
            Submit
          </button>
        </form>
        {responseMessage && (
          <p className="response-message">{responseMessage}</p>
        )}
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
  const [category, setCategory] = useState(null);
  const [groups, setGroups] = useState([]);
  const [completedTestIds, setCompletedTestIds] = useState([]); // Foydalanuvchi testlari saqlanadi
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Foydalanuvchi ma'lumotlarini email orqali qidirish
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("email"); // LocalStorage dan emailni oling

        const userResponse = await axios.get(
          `https://ctfhawksbackend.onrender.com/api/users` // API endpoint
        );

        const users = userResponse.data;

        // Foydalanuvchini email orqali topish
        const currentUser = users.find((user) => user.email === userEmail);

        if (currentUser) {
          console.log("User Data:", currentUser); // Tekshiruv uchun qo'shildi

          // Agar foydalanuvchida `testsTaken` yoki `groupsTaken` mavjud bo'lmasa, bo'sh massiv qo'shish
          const testsTaken = currentUser.testsTaken || [];
          const groupsTaken = currentUser.groupsTaken || [];

          // Foydalanuvchi tomonidan ishlangan testlarni aniqlash
          const userCompletedTestIds = [
            ...testsTaken.map((test) => test.testId),
            ...groupsTaken.flatMap((group) =>
              group.tests
                .filter((test) => test.correct)
                .map((test) => test.testId)
            ),
          ];
          setCompletedTestIds(userCompletedTestIds);
          console.log("Completed Test IDs:", userCompletedTestIds); // Tekshiruv uchun qo'shildi
        } else {
          console.error("Foydalanuvchi topilmadi:", userEmail);
        }
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", error);
      }
    };

    fetchUserData();

    axios
      .get(`https://ctfhawksbackend.onrender.com/api/categories/${id}`)
      .then((response) => {
        const categoryData = response.data;
        setCategory(categoryData);

        const groupPromises = categoryData.groups.map((groupId) =>
          axios.get(
            `https://ctfhawksbackend.onrender.com/api/groups/${groupId}`
          )
        );

        Promise.all(groupPromises)
          .then((responses) => {
            const groupsWithTests = responses
              .map((response) => response.data)
              .filter((group) => group.tests && group.tests.length > 0);
            setGroups(groupsWithTests);
          })
          .catch((error) => {
            console.error("Gruppalarni olishda xatolik:", error);
          });
      })
      .catch((error) => {
        console.error("Kategoriyani olishda xatolik:", error);
      });
  }, [id]);

  const openModal = (test) => {
    if (completedTestIds.includes(test._id)) {
      console.log("Test allaqachon bajarilgan:", test._id); // Tekshiruv uchun qo'shildi
      return;
    }
    setSelectedTest(test);
    setIsModalOpen(true);
    setResponseMessage("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTest(null);
    setShowHint(false);
    setAnswer("");
  };

  const toggleHint = () => {
    setShowHint((prev) => !prev);
  };

  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!accessToken) {
      setResponseMessage("Authentication error. Please log in again.");
      return;
    }

    axios
      .post(
        `https://ctfhawksbackend.onrender.com/api/tests/${selectedTest._id}`,
        { answer },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.correct) {
          // Test muvaffaqiyatli ishlanganida test ID ni yangilash
          setCompletedTestIds((prev) => [...prev, selectedTest._id]);
          setIsModalOpen(false);
        } else {
          setResponseMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Javobni yuborishda xatolik:", error);
        setResponseMessage("Javobni yuborishda xatolik yuz berdi.");
      });
  };

  return (
    <>
      <section className="challanges">
        <Container>
          <h2 className="chellenge-group">Ctf Challenge</h2>
          <ul className="challanges-ul">
            {groups.length > 0 ? (
              groups.map((group) => (
                <li key={group._id} className="challanges-box2">
                  <h3>{group.name}</h3>
                  <ul className="challanges-ul">
                    {group.tests.map((test) => {
                      // Testni to'g'ri ishlaganligini tekshirish
                      const isTestCompleted = completedTestIds.includes(
                        test._id
                      );
                      console.log(
                        `Test: ${test.name}, Test ID: ${test._id}, Completed: ${isTestCompleted}`
                      ); // Tekshiruv uchun qo'shildi

                      return (
                        <li
                          key={test._id}
                          className={`challanges-box ${
                            isTestCompleted ? "green-background" : ""
                          }`}
                          onClick={() => openModal(test)}
                          style={{
                            cursor: isTestCompleted ? "default" : "pointer",
                            backgroundColor: isTestCompleted ? "#59ec59" : "",
                          }}
                        >
                          <h2 className="challanges-title">{test.name}</h2>
                          <span className="challanges-text">{test.score}</span>
                        </li>
                      );
                    })}
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
            />
          )}
        </Container>
      </section>
    </>
  );
};
