import './App.css';

import { useState, useEffect } from 'react';

import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import Header from './components/Header';
import SparkLineChart from './components/SparkLineChart';
import ButtonBar from './components/ButtonBar';
import ThemeSwitcher from './components/ThemeSwitcher';
import axios from 'axios';

import Icon from './components/Icon';
import { getHost } from './services/hostService';

function App() {
  const [sixMonthsTurnupRatioData, setSixMonthsTurnupRatioData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/sixMonthsTurnupRatioData`, {}).then((response) => {
      const data = response.data;
      setSixMonthsTurnupRatioData(data);
    });
  }, []);

  const [oneYearTurnupRatioData, setOneYearTurnupRatioData] = useState({});

  useEffect(() => {
    axios.get(`${getHost()}/api/v1/oneYearTurnupRatioData`, {}).then((response) => {
      const data = response.data;
      setOneYearTurnupRatioData(data);
    });
  }, []);

  const [twoYearsTurnupRatioData, setTwoYearsTurnupRatioData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/twoYearsTurnupRatioData`, {}).then((response) => {
      const data = response.data;
      setTwoYearsTurnupRatioData(data);
    });
  }, []);

  const [seasonalIncome, setSeasonalIncome] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/oneYearSeasonalIncomeData`, {}).then((response) => {
      const data = response.data;
      setSeasonalIncome(data);
    });
  }, []);

  const [seasonalIncomeThreeYears, setSeasonalIncomeThreeYears] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/threeYearsSeasonalIncomeData`, {}).then((response) => {
      const data = response.data;
      setSeasonalIncomeThreeYears(data);
    });
  }, []);

  const [guestPerCountry, setGuestPerCountry] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/oneYearGuestPerCountryData`, {}).then((response) => {
      const data = response.data;
      setGuestPerCountry(data);
    });
  }, []);

  const [sixMonthsGuestPerCountryData, setSixMonthsGuestPerCountryData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/sixMonthsGuestPerCountryData`, {}).then((response) => {
      const data = response.data;
      setSixMonthsGuestPerCountryData(data);
    });
  }, []);

  const [oneYearGuestPerCountryData, setOneYearGuestPerCountryData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/oneYearGuestPerCountryData`, {}).then((response) => {
      const data = response.data;
      setOneYearGuestPerCountryData(data);
    });
  }, []);

  const [twoYearsGuestPerCountryData, setTwoYearsGuestPerCountryData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/twoYearsGuestPerCountryData`, {}).then((response) => {
      const data = response.data;
      setTwoYearsGuestPerCountryData(data);
    });
  }, []);

  const [roomTypesData, setRoomTypesData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/roomTypesData`, {}).then((response) => {
      const data = response.data;
      setRoomTypesData(data);
    });
  }, []);

  const [stayingLengthData, setStayingLengthData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/stayingLengthData`, {}).then((response) => {
      const data = response.data;
      setStayingLengthData(data);
    });
  }, []);

  const [visitPurposeData, setVisitPurposeData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/visitPurposeData`, {}).then((response) => {
      const data = response.data;
      setVisitPurposeData(data);
    });
  }, []);

  const [visitorTypeData, setVisitorTypeData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/visitorTypeData`, {}).then((response) => {
      const data = response.data;
      setVisitorTypeData(data);
    });
  }, []);

  const getOneYearIncome = () => {
    return Object.keys(seasonalIncome).length ? seasonalIncome.datasets[0]?.data || [] : [];
  };

  const getAverageMonthly = () => {
    if (getOneYearIncome().length) {
      const sum = getOneYearIncome().reduce((a, b) => a + b);
      const average = sum / 12;
      return average.toLocaleString();
    }
  };

  const handleSeasonalIncomeDataChange = (event) => {
    if (event.target.getAttribute('name') === '3y') {
      setSeasonalIncome(seasonalIncomeThreeYears);
    } else {
      setSeasonalIncome(seasonalIncome);
    }
  };

  const handleTurnupRatioChange = (event) => {
    const duration = event.target.getAttribute('name');
    switch (duration) {
      case '2y':
        setOneYearTurnupRatioData(twoYearsTurnupRatioData);
        break;
      case '1y':
        setOneYearTurnupRatioData(oneYearTurnupRatioData);
        break;
      case '6m':
        setOneYearTurnupRatioData(sixMonthsTurnupRatioData);
        break;
      // no default
    }
  };

  const handleGuestsPerCountryChange = (event) => {
    const duration = event.target.getAttribute('name');
    switch (duration) {
      case '2y':
        setGuestPerCountry(twoYearsGuestPerCountryData);
        break;
      case '1y':
        setGuestPerCountry(oneYearGuestPerCountryData);
        break;
      case '6m':
        setGuestPerCountry(sixMonthsGuestPerCountryData);
        break;
      default:
        break;
    }
  };

  return (
    <div className='App'>
      <Header className='flex-none mb-4 font-bold text-sm h-9'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-between items-center'>
            <Icon className='mr-2' icon='home'></Icon> LSEG Hotel - Powered By TRAVELOGO v1.3.2
          </div>
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </Header>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-1 gap-4'>
        <div className='grid col-span-2 chart-container'>
          <Header className='mb-4'>
            Seasonal Income ($)
            <ButtonBar managed slot='right' className='mr-1' ontap={handleSeasonalIncomeDataChange}>
              <ef-button name='3y' toggles>
                3Y
              </ef-button>
              <ef-button name='1y' active toggles>
                1Y
              </ef-button>
            </ButtonBar>
          </Header>
          <LineChart data={seasonalIncome} yAxisLabel={'Income ($)'} displayLegend />
        </div>
        <div className='grid col-span-2 chart-container'>
          <Header className='mb-4'>
            Turn up ratio (%)
            <ButtonBar managed slot='right' className='mr-1' ontap={handleTurnupRatioChange}>
              <ef-button name='2y' toggles>
                2Y
              </ef-button>
              <ef-button name='1y' active toggles>
                1Y
              </ef-button>
              <ef-button name='6m' toggles>
                6M
              </ef-button>
            </ButtonBar>
          </Header>
          <BarChart data={oneYearTurnupRatioData} yAxisLabel={'Turn up ratio (%)'} />
        </div>
        <div className='flex flex-col order-first col-span-2 row-span-2 lg:order-none lg:col-span-1 text-center'>
          <div className='flex flex-col grow items-center justify-center accent-bg'>
            <div>
              <h1 className='text-xl'>Average Rating</h1>
              <h1 className='text-6xl'>8.1/10</h1>
            </div>
          </div>
          <div className='flex flex-col grow items-center justify-center'>
            <div>
              <h1 className='text-xl'>Average Monthly $</h1>
              <h1 className='text-4xl'>${getAverageMonthly()}</h1>
            </div>
            <SparkLineChart
              className='w-full h-44 pt-6'
              data={getOneYearIncome()}
              referenceValue={10000}
            ></SparkLineChart>
          </div>
          <div className='flex flex-col grow items-center justify-center'>
            <div>
              <h1 className='text-xl'>ESG (By LSEG)</h1>
              <h1 className='text-6xl'>6.5</h1>
            </div>
          </div>
        </div>
        <div className='grid col-span-2 chart-container'>
          <Header>
            Guests per country
            <ButtonBar managed slot='right' className='mr-1' ontap={handleGuestsPerCountryChange}>
              <ef-button name='2y' toggles>
                2Y
              </ef-button>
              <ef-button name='1y' active toggles>
                1Y
              </ef-button>
              <ef-button name='6m' toggles>
                6M
              </ef-button>
            </ButtonBar>
          </Header>
          <LineChart data={guestPerCountry} yAxisLabel={'Guests'} displayLegend />
        </div>
        <div className='grid grid-cols-2 col-span-2 row-span-1 gap-2 chart-container'>
          <div>
            <Header className='mb-3'>Visitor Type (YTD)</Header>
            <PieChart data={visitorTypeData} />
          </div>
          <div>
            <Header className='mb-3'>Room Types (YTD)</Header>
            <PieChart data={roomTypesData} />
          </div>
          <div>
            <Header className='mb-3'>Purpose of Visit (YTD)</Header>
            <PieChart data={visitPurposeData} />
          </div>
          <div>
            <Header className='mb-3'>Staying Length (YTD)</Header>
            <PieChart data={stayingLengthData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;