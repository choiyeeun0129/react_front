// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconApps, IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';
import { NavItemType } from 'types';

// constant
const icons = {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const account: NavItemType = {
  id: 'utilities',
  title: <FormattedMessage id="회계 업무" />,
  icon: icons.IconApps,
  type: 'group',
  children: [
    {
      id: 'util-color',
      title: <FormattedMessage id="전표/장부관리" />,
      type: 'collapse',
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="일반전표" />,
          type: 'item',
          url: '/account/posting/slip/Slip'
        },
        {
          id: 'material-icons',
          title: <FormattedMessage id="전표승인 및 취소" />,
          type: 'item',
          url: '/account/posting/approvalmanager/ApprovalManager'
        },
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="지출증빙관리" />,
          type: 'item',
          url: '/account/posting/receipt/Receipt'
        },
        {
          id: 'material-icons',
          title: <FormattedMessage id="분개장" />,
          type: 'item',
          url: '/account/posting/jounalform/JounalForm'
        },
        {
          id: 'material-icons',
          title: <FormattedMessage id="일(월)계표" />,
          type: 'item',
          url: '/account/statement/detailtrialbalance/DetailTrialBalance'
        },
        {
          id: 'material-icons',
          title: <FormattedMessage id="총계정원장" />,
          type: 'item',
          url: '/account/posting/generalaccountledger/GeneralAccountLedger'
        },
        {
          id: 'material-icons',
          title: <FormattedMessage id="현금출납장" />,
          type: 'item',
          url: '/account/statement/cashjournal/CashJournal'
        }
      ]
    },
    {
      id: 'util-color',
      title: <FormattedMessage id="기초정보관리" />,
      type: 'collapse',
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="계정과목관리" />,
          type: 'item',
          url: '/account/base/accountform/AccountDialog'
        },
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="거래처 관리" />,
          type: 'item',
          url: '/account/base/workplacemanagement/WorkplaceManagement'
        }
      ]
    },
    {
      id: 'icons',
      title: <FormattedMessage id="결산/재무제표관리" />,
      type: 'collapse',
      icon: icons.IconNfc,
      children: [
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="합계잔액시산표" />,
          type: 'item',
          url: '/account/statement/totaltrialbalance/TotalTrialBalance'
        },
        {
          id: 'material-icons',
          title: <FormattedMessage id="재무상태표" />,
          type: 'item',
          url: '/account/statement/financialstatements/FinancialStatements'
        },
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="손익계산서" />,
          type: 'item',
          url: '/account/statement/incomestatement/IncomeStatement'
        },
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="월별손익계산서" />,
          type: 'item',
          url: '/account/statement/monthincomestatement/MonthIncomeStatement'
        },
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="전기분재무상태표" />,
          type: 'item',
          url: '/account/statement/previousfinalcialstatement/PreviousFinalcialStatement'
        },
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="자본변동표" />,
          type: 'item',
          url: '/account/statement/capitalstatement/CapitalStatement'
        },
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="결산 자료입력" />,
          type: 'item',
          url: '/account/statement/accounting/Accounting'
        }
      ]
    },
    {
      id: 'util-animation',
      title: <FormattedMessage id="예산 관리" />,
      type: 'collapse',
      url: '/utils/util-animation',
      icon: icons.IconBasket,
      children: [
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="예산 신청" />,
          type: 'item',
          url: '/account/budget/budgetrequest/BudgetRequest'
        },
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="예산 편성" />,
          type: 'item',
          url: '/account/budget/budgetformulation/BudgetFormulation'
        },
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="예산 실적 현황" />,
          type: 'item',
          url: '/account/budget/budgetstatus/BudgetStatus'
        }
      ]
    },
    {
      id: 'util-grid',
      title: <FormattedMessage id="고정자산 관리" />,
      type: 'collapse',
      url: '/utils/util-grid',
      icon: icons.IconBasket,
      children: [
        {
          id: 'tabler-icons',
          title: <FormattedMessage id="고정자산 등록" />,
          type: 'item',
          url: '/account/posting/noncurrentasset/NonCurrentAsset'
        }
      ]
    }
  ]
};

export default account;
