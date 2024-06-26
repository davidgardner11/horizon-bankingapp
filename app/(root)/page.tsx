import HeaderBox from '@/components/HeaderBox'
//import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const Home = async () => {
  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) redirect("/sign-in");

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedInUser?.name || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.41}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

      {/* <RightSidebar 
        user={loggedInUser}
        transactions={[]}
        banks={[{ currentBalance: 123.50 }, { currentBalance: 577.25 }]}
      /> */}
    </section>
  )
}

export default Home