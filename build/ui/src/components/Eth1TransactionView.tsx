import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import { goerliTxViewer } from "common/params";
import { newTabProps, urlJoin } from "utils";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  centerLink: {
    display: "flex",
    alignItems: "center",
  },
  linkIcon: {
    marginLeft: theme.spacing(0.5),
    display: "flex",
    fontSize: "1.2rem",
  },
}));

export const Eth1TransactionView: React.FC<{
  transactionHash?: string;
}> = function Eth1TransactionView({ children, transactionHash }) {
  const classes = useStyles();

  if (!transactionHash) return <>{children}</>;

  return (
    <div className={classes.centerLink}>
      {children}
      <Link
        className={classes.linkIcon}
        href={urlJoin(goerliTxViewer, transactionHash || "")}
        {...newTabProps}
      >
        <LaunchIcon fontSize="inherit" />
      </Link>
    </div>
  );
};

export function DepositEventsView({
  depositEvents,
}: {
  depositEvents: {
    [transactionHash: string]: {
      transactionHash?: string;
      blockNumber?: number;
    };
  };
}) {
  return (
    <div>
      {Object.entries(depositEvents).map(([key, depositEvent]) => (
        <Eth1TransactionView
          key={key}
          transactionHash={depositEvent.transactionHash}
        >
          Deposited: {depositEvent.blockNumber}
        </Eth1TransactionView>
      ))}
    </div>
  );
}
