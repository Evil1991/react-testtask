import './App.css';
import Form from "./components/Form";
import Loading from "./components/Loading";
import {useState} from "react";
import ThankYou from "./components/ThankYou";

function App() {
  const [loading, setLoading] = useState(true);
  const [isErrors, setIsErrors] = useState(false);

  const getLoading = (load) => {
    setLoading(load)
  }

  const getErrors = (data) => {
    if (data.errors == null) {
      setIsErrors(true)
    } else {
      setIsErrors(false)
    }
  }

  return (
    <div className="App">
      <Form getLoading={getLoading} getErrors={getErrors} className={[loading && !isErrors ? null : "form-hidden", "form-wrapper"].join(' ')}/>
      {!loading
        ? <Loading/>
        : null
      }
      {isErrors
        ? <ThankYou/>
        : null
      }
    </div>
  );
}

export default App;
