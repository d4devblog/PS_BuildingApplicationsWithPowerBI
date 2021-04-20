using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Http;
using Globomantics.XMLA.Models;
using Microsoft.AnalysisServices.AdomdClient;

namespace Globomantics.XMLA.Controllers
{
    public class XmlaController : ApiController
    {
        private readonly string _xmlaConnection;

        public XmlaController()
        {
            _xmlaConnection = ConfigurationManager.ConnectionStrings["XmlaConnection"].ConnectionString;
        }

        [HttpGet]
        [Route("api/OrderHistory/Customer/{customerId}")]
        public List<OrderHistory> OrderHistory(int customerId)
        {
            var orderHistory = new List<OrderHistory>();
            using (var connection = new AdomdConnection(_xmlaConnection))
            {
                var query = GetOrdersQuery();
                using (var command = new AdomdCommand(query, connection))
                {
                    command.Parameters.Add("customerId", customerId);
                    connection.Open();
                    
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            orderHistory.Add(new OrderHistory
                            {
                                CustomerId = (long)reader["Orders[CustomerId]"],
                                OrderId = (long)reader["Orders[OrderId]"],
                                OrderDate = (DateTime)reader["Orders[OrderDate]"],
                                ItemsReturned = (long?)reader["[TotalUnitsReturned]"],
                                NumberOfItems = (long)reader["[TotalUnitsSold]"],
                                SalesValue = (decimal?)reader["[TotalSales]"]
                            });
                        }
                    }
                }
            }

            return orderHistory;
        }

        private string GetOrdersQuery()
        {
            return @"DEFINE VAR __DS0FilterTable = 
                      TREATAS({@customerId}, 'Orders'[CustomerId])

                    EVALUATE
                      TOPN(
                        501,
                        SUMMARIZECOLUMNS(
                          'Orders'[CustomerId],
                          'Orders'[OrderId],
                          'Orders'[OrderDate],
                          __DS0FilterTable,
                          ""TotalSales"", 'Orders'[TotalSales],
                          ""TotalUnitsReturned"", 'Orders'[TotalUnitsReturned],
                          ""TotalUnitsSold"", 'Orders'[TotalUnitsSold]
                        ),
                        'Orders'[OrderDate],
                        0,
                        'Orders'[CustomerId],
                        1,
                        'Orders'[OrderId],
                        1
                      )

                    ORDER BY
                      'Orders'[OrderDate] DESC, 'Orders'[CustomerId], 'Orders'[OrderId]";
        }
    }
}
